import {
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  where,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore/lite";
import { getFirebaseApp } from "./firebase";

export type CaseStudy = {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  summary: string;
  headlineMetric: string;
  metricLabel: string;
  highlightMetrics: HighlightMetric[];
  duration: string;
  services: string[];
  tags: string[];
  publishedAt: string;
  coverImagePath: string;
  galleryImages: string[];
  content: string;
};

export type HighlightMetric = {
  value: string;
  label: string;
};

function toIsoDate(value: unknown) {
  if (!value) return new Date().toISOString();
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "string") return new Date(value).toISOString();
  if (
    typeof value === "object" &&
    "toDate" in value &&
    typeof value.toDate === "function"
  ) {
    return value.toDate().toISOString();
  }
  return new Date().toISOString();
}

function toStringList(value: unknown) {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(String).filter(Boolean);
  return String(value)
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function toHighlightMetrics(data: DocumentData): HighlightMetric[] {
  const value = data.highlightMetrics;

  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === "string") {
          const [metricValue, ...labelParts] = item.split("|");
          return {
            value: metricValue.trim(),
            label: labelParts.join("|").trim(),
          };
        }

        if (item && typeof item === "object") {
          return {
            value: String(item.value ?? "").trim(),
            label: String(item.label ?? "").trim(),
          };
        }

        return null;
      })
      .filter((item): item is HighlightMetric => Boolean(item?.value));
  }

  if (typeof value === "string") {
    return value
      .split(/\r?\n/)
      .map((line) => {
        const [metricValue, ...labelParts] = line.split("|");
        return {
          value: metricValue.trim(),
          label: labelParts.join("|").trim(),
        };
      })
      .filter((item) => item.value);
  }

  if (data.headlineMetric) {
    return [
      {
        value: String(data.headlineMetric),
        label: String(data.metricLabel ?? ""),
      },
    ];
  }

  return [];
}

function toCaseStudy(snapshot: QueryDocumentSnapshot<DocumentData>): CaseStudy {
  const data = snapshot.data();
  const slug = String(data.slug ?? snapshot.id);

  return {
    id: snapshot.id,
    slug,
    title: String(data.title ?? "Untitled case study"),
    client: String(data.client ?? "Client"),
    category: String(data.category ?? "Growth"),
    summary: String(data.summary ?? ""),
    headlineMetric: String(data.headlineMetric ?? ""),
    metricLabel: String(data.metricLabel ?? ""),
    highlightMetrics: toHighlightMetrics(data),
    duration: String(data.duration ?? ""),
    services: toStringList(data.services),
    tags: toStringList(data.tags),
    publishedAt: toIsoDate(data.publishedAt),
    coverImagePath: String(data.coverImagePath ?? data.ogImagePath ?? ""),
    galleryImages: toStringList(data.galleryImages),
    content: String(data.content ?? ""),
  };
}

function caseStudiesCollection() {
  const app = getFirebaseApp();
  if (!app) return null;
  return collection(getFirestore(app), "caseStudies");
}

export async function getCaseStudies() {
  const caseStudiesRef = caseStudiesCollection();
  if (!caseStudiesRef) return [];

  try {
    const snapshot = await getDocs(query(caseStudiesRef, orderBy("publishedAt", "desc")));
    return snapshot.docs.map(toCaseStudy);
  } catch (error) {
    console.error("Failed to fetch Firestore case studies", error);
    return [];
  }
}

export async function getCaseStudyBySlug(slug: string) {
  const caseStudiesRef = caseStudiesCollection();
  if (!caseStudiesRef) return null;

  try {
    const snapshot = await getDocs(query(caseStudiesRef, where("slug", "==", slug), limit(1)));
    const doc = snapshot.docs[0];
    return doc ? toCaseStudy(doc) : null;
  } catch (error) {
    console.error(`Failed to fetch Firestore case study: ${slug}`, error);
    return null;
  }
}

export function caseStudyDescription(caseStudy: CaseStudy, maxLength = 180) {
  const text =
    caseStudy.summary ||
    caseStudy.content
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  if (!text) return "A My Lead Partner case study on building growth as a system.";
  return text.length > maxLength ? `${text.slice(0, maxLength - 1).trim()}...` : text;
}
