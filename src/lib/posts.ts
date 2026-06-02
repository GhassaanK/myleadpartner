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
import { defaultAuthor } from "./site";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  category: string;
  tags: string[];
  readTime: string;
  publishedAt: string;
  content: string;
  ogImagePath: string;
  author: string;
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

function toPost(snapshot: QueryDocumentSnapshot<DocumentData>): BlogPost {
  const data = snapshot.data();

  return {
    id: snapshot.id,
    slug: String(data.slug ?? snapshot.id),
    title: String(data.title ?? "Untitled post"),
    category: String(data.category ?? "Growth"),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    readTime: String(data.readTime ?? "5 min read"),
    publishedAt: toIsoDate(data.publishedAt),
    content: String(data.content ?? ""),
    ogImagePath: String(data.ogImagePath ?? `/blog-og/${data.slug ?? snapshot.id}`),
    author: String(data.author ?? defaultAuthor),
  };
}

function postsCollection() {
  const app = getFirebaseApp();
  if (!app) return null;
  return collection(getFirestore(app), "posts");
}

export async function getPosts() {
  const postsRef = postsCollection();
  if (!postsRef) return [];

  try {
    const snapshot = await getDocs(query(postsRef, orderBy("publishedAt", "desc")));
    return snapshot.docs.map(toPost);
  } catch (error) {
    console.error("Failed to fetch Firestore posts", error);
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  const postsRef = postsCollection();
  if (!postsRef) return null;

  try {
    const snapshot = await getDocs(query(postsRef, where("slug", "==", slug), limit(1)));
    const doc = snapshot.docs[0];
    return doc ? toPost(doc) : null;
  } catch (error) {
    console.error(`Failed to fetch Firestore post: ${slug}`, error);
    return null;
  }
}

export function formatPublishedAt(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function postDescription(post: BlogPost, maxLength = 180) {
  const text = post.content
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!text) return "Growth strategy and operations insight from My Lead Partner.";
  return text.length > maxLength ? `${text.slice(0, maxLength - 1).trim()}...` : text;
}
