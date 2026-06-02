"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { upload } from "@vercel/blob/client";
import { getFirebaseApp, isFirebaseConfigured } from "@/lib/firebase";

// ─── Types ────────────────────────────────────────────────────────────────────

type PostStatus = "published" | "scheduled";
type ContentType = "posts" | "caseStudies";

type FormState = {
  slug: string;
  title: string;
  category: string;
  tags: string;
  readTime: string;
  publishedAt: string;
  ogImagePath: string;
  author: string;
  status: PostStatus;
  scheduledAt: string; // ISO datetime-local string
  client: string;
  summary: string;
  headlineMetric: string;
  metricLabel: string;
  highlightMetrics: string;
  duration: string;
  services: string;
  coverImagePath: string;
  galleryImages: string;
};

type PostMeta = {
  slug: string;
  title: string;
  category: string;
  publishedAt: Timestamp;
  scheduledAt?: Timestamp;
  status: PostStatus;
  tags: string[];
  readTime: string;
  ogImagePath: string;
  author: string;
  content: string;
  client?: string;
  summary?: string;
  headlineMetric?: string;
  metricLabel?: string;
  highlightMetrics?: Array<{ value: string; label: string }>;
  duration?: string;
  services?: string[];
  coverImagePath?: string;
  galleryImages?: string[];
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const initialForm: FormState = {
  slug: "",
  title: "",
  category: "Performance Marketing",
  tags: "",
  readTime: "5 min read",
  publishedAt: new Date().toISOString().slice(0, 10),
  ogImagePath: "",
  author: "My Lead Partner",
  status: "published",
  scheduledAt: "",
  client: "",
  summary: "",
  headlineMetric: "",
  metricLabel: "",
  highlightMetrics: "",
  duration: "",
  services: "",
  coverImagePath: "",
  galleryImages: "",
};

const initialCaseStudyForm: FormState = {
  ...initialForm,
  category: "Case Study",
  readTime: "Case study",
  author: "My Lead Partner",
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function cleanFileName(value: string) {
  const dotIndex = value.lastIndexOf(".");
  const extension = dotIndex >= 0 ? value.slice(dotIndex).toLowerCase() : "";
  const name = dotIndex >= 0 ? value.slice(0, dotIndex) : value;

  return `${slugify(name) || "image"}${extension.replace(/[^a-z0-9.]/g, "")}`;
}

function formatDate(ts: Timestamp) {
  return ts.toDate().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatScheduled(ts: Timestamp) {
  return ts.toDate().toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Returns true if a scheduled post's time has passed — meaning it's now live
function isLive(post: PostMeta): boolean {
  if (post.status === "published") return true;
  if (!post.scheduledAt) return false;
  return post.scheduledAt.toDate() <= new Date();
}

// ─── Trash icon ───────────────────────────────────────────────────────────────

function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4h6v2" />
    </svg>
  );
}

// ─── Login screen ─────────────────────────────────────────────────────────────

function LoginScreen({
  onLogin,
}: {
  onLogin: (email: string, password: string) => Promise<string>;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Signing in...");
    const error = await onLogin(email, password);
    if (error) setStatus(error);
  }

  return (
    <main className="min-h-screen bg-[var(--background)] px-6 py-16 text-[var(--text)] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="grid w-full max-w-md gap-4 border border-[var(--border)] bg-[var(--surface)] p-8"
      >
        <div className="mb-2">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            My Lead Partner
          </p>
          <h1 className="font-heading text-3xl mt-1">Admin</h1>
        </div>
        <label className="grid gap-2 text-sm text-[var(--secondary)]">
          Email
          <input
            className="min-h-12 border border-[var(--border)] bg-[var(--field)] px-3 text-[var(--text)] outline-none focus:border-[var(--accent)] transition-colors"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="grid gap-2 text-sm text-[var(--secondary)]">
          Password
          <input
            className="min-h-12 border border-[var(--border)] bg-[var(--field)] px-3 text-[var(--text)] outline-none focus:border-[var(--accent)] transition-colors"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button
          className="min-h-12 rounded-full bg-[var(--accent)] px-5 font-bold text-[var(--background)] hover:opacity-90 transition-opacity"
          type="submit"
        >
          Sign in
        </button>
        {status && <p className="text-sm text-[var(--secondary)]">{status}</p>}
      </form>
    </main>
  );
}

// ─── Delete confirmation modal ────────────────────────────────────────────────

function DeleteModal({
  title,
  onConfirm,
  onCancel,
}: {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-sm border border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xl">
        <h2 className="font-heading text-xl text-[var(--text)]">Delete item?</h2>
        <p className="mt-2 text-sm text-[var(--secondary)]">
          <span className="font-semibold text-[var(--text)]">{title}</span> will be
          permanently removed from Firestore.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 min-h-10 rounded-full bg-red-600 text-sm font-bold text-white hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            className="flex-1 min-h-10 rounded-full border border-[var(--border)] text-sm text-[var(--secondary)] hover:border-[var(--text)] transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ post }: { post: PostMeta }) {
  if (post.status === "published") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-500">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Live
      </span>
    );
  }
  if (isLive(post)) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-500">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Auto-live
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-500">
      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
      Scheduled
    </span>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function AdminEditor() {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [contentType, setContentType] = useState<ContentType>("posts");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [originalSlug, setOriginalSlug] = useState<string | null>(null);
  const [isNewPost, setIsNewPost] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile sidebar toggle
  const [form, setForm] = useState<FormState>(initialForm);
  const slugManuallyEdited = useRef(false);
  const [status, setStatus] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<PostMeta | null>(null);
  const isCaseStudy = contentType === "caseStudies";
  const collectionName = isCaseStudy ? "caseStudies" : "posts";
  const singularLabel = isCaseStudy ? "case study" : "post";
  const pluralLabel = isCaseStudy ? "Case Studies" : "Posts";

  const app = useMemo(() => getFirebaseApp(), []);
  const auth = app ? getAuth(app) : null;
  const db = app ? getFirestore(app) : null;
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const canPublish = Boolean(user && (!adminEmail || user.email === adminEmail));

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      LinkExtension.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: "Write the body here..." }),
    ],
    content: "<p></p>",
    editorProps: {
      attributes: {
        class:
          "min-h-[320px] rounded-md border border-[var(--border)] bg-[var(--field)] px-4 py-3 text-[var(--text)] outline-none focus:border-[var(--accent)] transition-colors",
      },
    },
  });

  // Auth listener
  useEffect(() => {
    if (!auth) return;
    return onAuthStateChanged(auth, setUser);
  }, [auth]);

  // Posts listener
  useEffect(() => {
    if (!db || !user) return;
    const q = query(collection(db, collectionName), orderBy("publishedAt", "desc"));
    return onSnapshot(q, (snap) => {
      setPosts(snap.docs.map((d) => d.data() as PostMeta));
    });
  }, [collectionName, db, user]);

  // ── Helpers ────────────────────────────────────────────────────────────────

  function resetEditor() {
    setForm(isCaseStudy ? initialCaseStudyForm : initialForm);
    setOriginalSlug(null);
    slugManuallyEdited.current = false;
    setStatus("");
    editor?.commands.setContent("<p></p>");
  }

  function switchContentType(type: ContentType) {
    if (type === contentType) return;
    setContentType(type);
    setPosts([]);
    setSelectedSlug(null);
    setIsNewPost(false);
    setDeleteTarget(null);
    setSidebarOpen(false);
    setForm(type === "caseStudies" ? initialCaseStudyForm : initialForm);
    setOriginalSlug(null);
    slugManuallyEdited.current = false;
    setStatus("");
    editor?.commands.setContent("<p></p>");
  }

  function updateField(name: keyof FormState, value: string) {
    if (name === "slug") slugManuallyEdited.current = true;
    setForm((current) => ({
      ...current,
      [name]: value,
      slug:
        name === "title" && !slugManuallyEdited.current
          ? slugify(value)
          : name === "slug"
          ? slugify(value)
          : current.slug,
    }));
  }

  async function uploadCaseStudyImages(files: FileList | File[], target: "cover" | "gallery") {
    const currentUser = auth?.currentUser;
    if (!currentUser) {
      setStatus("Sign in before uploading images.");
      return;
    }
    if (!canPublish || !isCaseStudy) return;

    const selectedFiles = Array.from(files).filter((file) => file.type.startsWith("image/"));
    if (selectedFiles.length === 0) {
      setStatus("Choose an image file to upload.");
      return;
    }

    const slug = slugify(form.slug || form.title) || "draft";
    setIsUploading(true);
    setStatus(`Uploading ${selectedFiles.length} image${selectedFiles.length === 1 ? "" : "s"}...`);

    try {
      const idToken = await currentUser.getIdToken();
      const urls = await Promise.all(
        selectedFiles.map(async (file) => {
          const path = `case-studies/${slug}/${Date.now()}-${cleanFileName(file.name)}`;
          const blob = await upload(path, file, {
            access: "public",
            contentType: file.type,
            handleUploadUrl: "/api/blob-upload",
            clientPayload: JSON.stringify({
              contentType: collectionName,
              slug,
              target,
            }),
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          });
          return blob.url;
        }),
      );

      if (target === "cover") {
        updateField("coverImagePath", urls[0]);
      } else {
        setForm((current) => ({
          ...current,
          galleryImages: [current.galleryImages.trim(), ...urls]
            .filter(Boolean)
            .join("\n"),
        }));
      }

      setStatus(`${selectedFiles.length} image${selectedFiles.length === 1 ? "" : "s"} uploaded.`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Image upload failed.");
    } finally {
      setIsUploading(false);
    }
  }

  function openNewPost() {
    resetEditor();
    setSelectedSlug(null);
    setIsNewPost(true);
    setSidebarOpen(false);
  }

  function openEditPost(post: PostMeta) {
    setSelectedSlug(post.slug);
    setOriginalSlug(post.slug);
    setIsNewPost(false);
    setStatus("");
    slugManuallyEdited.current = true;
    setSidebarOpen(false);
    setForm({
      slug: post.slug,
      title: post.title,
      category: post.category,
      tags: post.tags.join(", "),
      readTime: post.readTime,
      publishedAt: post.publishedAt.toDate().toISOString().slice(0, 10),
      ogImagePath: post.ogImagePath ?? "",
      author: post.author ?? "My Lead Partner",
      status: post.status ?? "published",
      scheduledAt: post.scheduledAt
        ? post.scheduledAt.toDate().toISOString().slice(0, 16)
        : "",
      client: post.client ?? "",
      summary: post.summary ?? "",
      headlineMetric: post.headlineMetric ?? "",
      metricLabel: post.metricLabel ?? "",
      highlightMetrics:
        post.highlightMetrics && post.highlightMetrics.length > 0
          ? post.highlightMetrics
              .map((metric) => `${metric.value}${metric.label ? ` | ${metric.label}` : ""}`)
              .join("\n")
          : post.headlineMetric
          ? `${post.headlineMetric}${post.metricLabel ? ` | ${post.metricLabel}` : ""}`
          : "",
      duration: post.duration ?? "",
      services: (post.services ?? []).join(", "),
      coverImagePath: post.coverImagePath ?? post.ogImagePath ?? "",
      galleryImages: (post.galleryImages ?? []).join("\n"),
    });
    editor?.commands.setContent(post.content ?? "<p></p>");
  }

  // ── Auth ───────────────────────────────────────────────────────────────────

  async function handleLogin(email: string, password: string): Promise<string> {
    if (!auth) return "Auth not available.";
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return "";
    } catch (error) {
      return error instanceof Error ? error.message : "Sign in failed.";
    }
  }

  // ── Save ───────────────────────────────────────────────────────────────────

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!app || !editor || !canPublish || !db) return;

    const slug = slugify(form.slug || form.title);
    if (!slug || !form.title.trim()) {
      setStatus("Title and slug are required.");
      return;
    }

    if (form.status === "scheduled" && !form.scheduledAt) {
      setStatus("Pick a scheduled date and time.");
      return;
    }

    const docId = originalSlug ?? slug;
    const tags = form.tags.split(",").map((t) => t.trim()).filter(Boolean);
    const services = form.services.split(",").map((t) => t.trim()).filter(Boolean);
    const highlightMetrics = form.highlightMetrics
      .split(/\r?\n/)
      .map((line) => {
        const [value, ...labelParts] = line.split("|");
        return {
          value: value.trim(),
          label: labelParts.join("|").trim(),
        };
      })
      .filter((metric) => metric.value);
    const galleryImages = form.galleryImages
      .split(/\r?\n|,/)
      .map((image) => image.trim())
      .filter(Boolean);

    setIsSaving(true);
    setStatus("Saving...");

    try {
      await setDoc(
        doc(db, collectionName, docId),
        {
          slug,
          title: form.title.trim(),
          category: form.category.trim(),
          tags,
          readTime: form.readTime.trim(),
          publishedAt: Timestamp.fromDate(new Date(form.publishedAt)),
          content: editor.getHTML(),
          ogImagePath: isCaseStudy
            ? form.coverImagePath.trim()
            : form.ogImagePath.trim() || `/blog-og/${slug}`,
          author: form.author.trim() || "My Lead Partner",
          ...(isCaseStudy
            ? {
                client: form.client.trim(),
                summary: form.summary.trim(),
                headlineMetric: highlightMetrics[0]?.value ?? form.headlineMetric.trim(),
                metricLabel: highlightMetrics[0]?.label ?? form.metricLabel.trim(),
                highlightMetrics,
                duration: form.duration.trim(),
                services,
                coverImagePath: form.coverImagePath.trim(),
                galleryImages,
              }
            : {}),
          status: form.status,
          scheduledAt:
            form.status === "scheduled" && form.scheduledAt
              ? Timestamp.fromDate(new Date(form.scheduledAt))
              : null,
          updatedAt: serverTimestamp(),
        },
        { merge: true },
      );

      setStatus(
        form.status === "scheduled"
          ? `Scheduled for ${new Date(form.scheduledAt).toLocaleString()}`
          : isNewPost
          ? `${isCaseStudy ? "Case study" : "Post"} published.`
          : `${isCaseStudy ? "Case study" : "Post"} updated.`,
      );

      if (isNewPost) {
        resetEditor();
        setIsNewPost(false);
      } else {
        setSelectedSlug(docId);
      }
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Save failed.");
    } finally {
      setIsSaving(false);
    }
  }

  // ── Delete ─────────────────────────────────────────────────────────────────

  async function confirmDelete() {
    if (!db || !deleteTarget) return;
    try {
      await deleteDoc(doc(db, collectionName, deleteTarget.slug));
      if (selectedSlug === deleteTarget.slug) {
        resetEditor();
        setSelectedSlug(null);
        setIsNewPost(false);
      }
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Delete failed.");
    } finally {
      setDeleteTarget(null);
    }
  }

  // ── Guards ─────────────────────────────────────────────────────────────────

  if (!isFirebaseConfigured()) {
    return (
      <main className="min-h-screen bg-[var(--background)] px-6 py-16 text-[var(--text)]">
        <div className="mx-auto max-w-2xl border border-[var(--border)] bg-[var(--surface)] p-8">
          <h1 className="font-heading text-3xl">Admin unavailable</h1>
          <p className="mt-4 text-[var(--secondary)]">
            Add the Firebase public environment variables before using the publishing console.
          </p>
        </div>
      </main>
    );
  }

  if (!user) return <LoginScreen onLogin={handleLogin} />;

  const editorOpen = isNewPost || selectedSlug !== null;

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      {deleteTarget && (
        <DeleteModal
          title={deleteTarget.title}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Top bar */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-[var(--border)] bg-[var(--background)] px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Hamburger — mobile only */}
          <button
            className="flex h-8 w-8 items-center justify-center rounded border border-[var(--border)] text-[var(--secondary)] lg:hidden"
            onClick={() => setSidebarOpen((v) => !v)}
            aria-label="Toggle posts list"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <rect y="2" width="16" height="1.5" rx="1" />
              <rect y="7.25" width="16" height="1.5" rx="1" />
              <rect y="12.5" width="16" height="1.5" rx="1" />
            </svg>
          </button>
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            My Lead Partner
          </p>
          <span className="hidden text-[var(--border)] sm:inline">/</span>
          <p className="hidden text-sm text-[var(--secondary)] sm:block">Admin</p>
          <div className="hidden rounded-full border border-[var(--border)] p-1 sm:flex">
            {(["posts", "caseStudies"] as ContentType[]).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => switchContentType(type)}
                className={`rounded-full px-3 py-1 text-xs font-bold transition-colors ${
                  contentType === type
                    ? "bg-[var(--accent)] text-[var(--background)]"
                    : "text-[var(--secondary)] hover:text-[var(--text)]"
                }`}
              >
                {type === "posts" ? "Posts" : "Case Studies"}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={openNewPost}
            className="rounded-full bg-[var(--accent)] px-3 py-1.5 text-xs font-bold text-[var(--background)] hover:opacity-90 transition-opacity lg:hidden"
          >
            + New
          </button>
          <button
            className="rounded-full border border-[var(--border)] px-4 py-1.5 text-sm text-[var(--secondary)] hover:border-[var(--text)] transition-colors"
            type="button"
            onClick={() => auth && signOut(auth)}
          >
            Sign out
          </button>
        </div>
      </header>

      <div className="flex h-[calc(100vh-49px)]">

        {/* Left: posts list */}
        <aside
          className={`
            fixed top-[49px] left-0 z-40 h-[calc(100vh-49px)] w-72 shrink-0 flex-col
            border-r border-[var(--border)] bg-[var(--surface)]
            transform transition-transform duration-200
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:relative lg:top-auto lg:z-auto lg:flex lg:translate-x-0
          `}
        >
          <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--secondary)]">
              {pluralLabel} ({posts.length})
            </p>
            <button
              onClick={openNewPost}
              className="rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-bold text-[var(--background)] hover:opacity-90 transition-opacity"
            >
              + New
            </button>
          </div>

          <div className="border-b border-[var(--border)] p-3 sm:hidden">
            <div className="grid grid-cols-2 gap-1 rounded-full border border-[var(--border)] p-1">
              {(["posts", "caseStudies"] as ContentType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => switchContentType(type)}
                  className={`rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
                    contentType === type
                      ? "bg-[var(--accent)] text-[var(--background)]"
                      : "text-[var(--secondary)]"
                  }`}
                >
                  {type === "posts" ? "Posts" : "Cases"}
                </button>
              ))}
            </div>
          </div>

          <ul className="flex-1 overflow-y-auto">
            {posts.length === 0 && (
              <li className="px-4 py-8 text-center text-sm text-[var(--secondary)]">
                No {pluralLabel.toLowerCase()} yet.
              </li>
            )}
            {posts.map((post) => (
              <li
                key={post.slug}
                className={`relative border-b border-[var(--border)] transition-colors ${
                  selectedSlug === post.slug
                    ? "bg-[var(--field)]"
                    : "hover:bg-[var(--field)]"
                }`}
              >
                <button
                  className="w-full py-3 pl-4 pr-10 text-left"
                  onClick={() => openEditPost(post)}
                >
                  <p className="text-sm font-semibold text-[var(--text)] leading-snug line-clamp-2">
                    {post.title}
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[var(--secondary)]">
                    <span>{post.category}</span>
                    <span className="text-[var(--border)]">·</span>
                    <span>
                      {post.status === "scheduled" && post.scheduledAt
                        ? formatScheduled(post.scheduledAt)
                        : formatDate(post.publishedAt)}
                    </span>
                  </div>
                  <div className="mt-1.5">
                    <StatusBadge post={post} />
                  </div>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteTarget(post);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center rounded p-1.5 text-[var(--secondary)] hover:text-red-500 transition-colors"
                  title="Delete post"
                >
                  <TrashIcon />
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Right: editor */}
        <section className="flex flex-1 flex-col overflow-y-auto">
          {!editorOpen ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center px-6">
              <p className="text-2xl font-heading text-[var(--text)]">No {singularLabel} selected</p>
              <p className="text-sm text-[var(--secondary)]">
                Pick a {singularLabel} from the list to edit, or create a new one.
              </p>
              <button
                onClick={openNewPost}
                className="mt-2 rounded-full bg-[var(--accent)] px-6 py-2.5 text-sm font-bold text-[var(--background)] hover:opacity-90 transition-opacity"
              >
                + New {isCaseStudy ? "Case Study" : "Post"}
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSave}
              className="flex flex-col gap-5 p-4 sm:p-6 max-w-4xl w-full mx-auto"
            >
              <div className="flex items-center justify-between gap-3">
                <h1 className="font-heading text-xl sm:text-2xl">
                  {isNewPost ? `New ${singularLabel}` : `Edit ${singularLabel}`}
                </h1>
                {!isNewPost && (
                  <span className="text-xs text-[var(--secondary)] border border-[var(--border)] rounded-full px-3 py-1 truncate max-w-[160px] sm:max-w-none">
                    Doc: {originalSlug}
                  </span>
                )}
              </div>

              {!canPublish && (
                <div className="border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--secondary)]">
                  This account is not allowed to publish.
                </div>
              )}

              {/* Fields grid */}
              <div className="grid gap-4 sm:grid-cols-2">
                {(
                  (isCaseStudy
                    ? [
                        ["title", "Title"],
                        ["slug", "Slug"],
                        ["client", "Client / business"],
                        ["category", "Industry / category"],
                        ["duration", "Timeline / duration"],
                        ["services", "Services, comma separated"],
                        ["tags", "Tags, comma separated"],
                      ]
                    : [
                        ["title", "Title"],
                        ["slug", "Slug"],
                        ["category", "Category"],
                        ["tags", "Tags, comma separated"],
                        ["readTime", "Read time"],
                        ["author", "Author"],
                        ["ogImagePath", "OG image path"],
                      ]) as [keyof FormState, string][]
                ).map(([name, label]) => (
                  <label key={name} className="grid gap-2 text-sm text-[var(--secondary)]">
                    {label}
                    <input
                      className="min-h-12 border border-[var(--border)] bg-[var(--field)] px-3 text-[var(--text)] outline-none focus:border-[var(--accent)] transition-colors"
                      value={form[name] as string}
                      onChange={(e) => updateField(name, e.target.value)}
                      required={
                        name !== "ogImagePath" &&
                        name !== "tags" &&
                        name !== "coverImagePath" &&
                        name !== "services" &&
                        name !== "duration" &&
                        name !== "headlineMetric" &&
                        name !== "metricLabel"
                      }
                    />
                  </label>
                ))}
                <label className="grid gap-2 text-sm text-[var(--secondary)]">
                  Published date
                  <input
                    className="min-h-12 border border-[var(--border)] bg-[var(--field)] px-3 text-[var(--text)] outline-none focus:border-[var(--accent)] transition-colors"
                    type="date"
                    value={form.publishedAt}
                    onChange={(e) => updateField("publishedAt", e.target.value)}
                    required
                  />
                </label>
              </div>

              {isCaseStudy && (
                <div className="grid gap-4 rounded-md border border-[var(--border)] bg-[var(--surface)] p-4">
                  <label className="grid gap-2 text-sm text-[var(--secondary)]">
                    Short summary
                    <textarea
                      className="min-h-28 resize-y border border-[var(--border)] bg-[var(--field)] px-3 py-3 text-[var(--text)] outline-none focus:border-[var(--accent)] transition-colors"
                      value={form.summary}
                      onChange={(e) => updateField("summary", e.target.value)}
                      placeholder="A concise setup of the problem, work, and result. This appears on cards and the case-study header."
                    />
                  </label>
                  <div className="grid gap-3 rounded-md border border-[var(--border)] bg-[var(--field)] p-4">
                    <div className="grid gap-2 text-sm text-[var(--secondary)]">
                      Cover image upload
                      <input
                        className="block w-full cursor-pointer text-sm text-[var(--secondary)] file:mr-4 file:min-h-10 file:rounded-full file:border-0 file:bg-[var(--accent)] file:px-4 file:text-sm file:font-bold file:text-[var(--background)]"
                        type="file"
                        accept="image/*"
                        disabled={isUploading || !canPublish}
                        onChange={(event) => {
                          if (event.currentTarget.files) {
                            void uploadCaseStudyImages(event.currentTarget.files, "cover");
                            event.currentTarget.value = "";
                          }
                        }}
                      />
                    </div>
                    <label className="grid gap-2 text-sm text-[var(--secondary)]">
                      Cover image URL
                      <input
                        className="min-h-12 border border-[var(--border)] bg-[var(--field)] px-3 text-[var(--text)] outline-none focus:border-[var(--accent)] transition-colors"
                        value={form.coverImagePath}
                        onChange={(e) => updateField("coverImagePath", e.target.value)}
                        placeholder="Upload an image above, or paste a URL."
                      />
                    </label>
                  </div>
                  <label className="grid gap-2 text-sm text-[var(--secondary)]">
                    Highlight metrics
                    <textarea
                      className="min-h-28 resize-y border border-[var(--border)] bg-[var(--field)] px-3 py-3 text-[var(--text)] outline-none focus:border-[var(--accent)] transition-colors"
                      value={form.highlightMetrics}
                      onChange={(e) => updateField("highlightMetrics", e.target.value)}
                      placeholder={"4.2x | Qualified lead volume\n62% | Lower cost per purchase\n80 | Qualified enquiries per month"}
                    />
                    <p className="text-xs leading-relaxed text-[var(--secondary)]">
                      Add one metric per line. Put the big number first, then a vertical bar, then the label.
                    </p>
                  </label>
                  <div className="grid gap-3 rounded-md border border-[var(--border)] bg-[var(--field)] p-4">
                    <div className="grid gap-2 text-sm text-[var(--secondary)]">
                      Gallery image uploads
                      <input
                        className="block w-full cursor-pointer text-sm text-[var(--secondary)] file:mr-4 file:min-h-10 file:rounded-full file:border-0 file:bg-[var(--accent)] file:px-4 file:text-sm file:font-bold file:text-[var(--background)]"
                        type="file"
                        accept="image/*"
                        multiple
                        disabled={isUploading || !canPublish}
                        onChange={(event) => {
                          if (event.currentTarget.files) {
                            void uploadCaseStudyImages(event.currentTarget.files, "gallery");
                            event.currentTarget.value = "";
                          }
                        }}
                      />
                    </div>
                    <p className="text-xs leading-relaxed text-[var(--secondary)]">
                      Uploaded gallery images are appended below automatically.
                    </p>
                  </div>
                  <label className="grid gap-2 text-sm text-[var(--secondary)]">
                    Gallery image paths or URLs
                    <textarea
                      className="min-h-28 resize-y border border-[var(--border)] bg-[var(--field)] px-3 py-3 text-[var(--text)] outline-none focus:border-[var(--accent)] transition-colors"
                      value={form.galleryImages}
                      onChange={(e) => updateField("galleryImages", e.target.value)}
                      placeholder={"/case-study-image-1.jpg\nhttps://example.com/image-2.jpg"}
                    />
                    <p className="text-xs leading-relaxed text-[var(--secondary)]">
                      Add one image per line. Use files from the public folder like /work.jpg, or paste hosted image URLs.
                    </p>
                  </label>
                </div>
              )}

              {/* Scheduling section */}
              <div className="grid gap-3 rounded-md border border-[var(--border)] bg-[var(--surface)] p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--secondary)]">
                  Publishing
                </p>
                <div className="flex flex-wrap gap-3">
                  {(["published", "scheduled"] as PostStatus[]).map((s) => (
                    <label
                      key={s}
                      className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                        form.status === s
                          ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]"
                          : "border-[var(--border)] text-[var(--secondary)] hover:border-[var(--text)]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="status"
                        value={s}
                        checked={form.status === s}
                        onChange={() => updateField("status", s)}
                        className="sr-only"
                      />
                      {s === "published" ? "Publish now" : "Schedule"}
                    </label>
                  ))}
                </div>

                {form.status === "scheduled" && (
                  <label className="grid gap-2 text-sm text-[var(--secondary)]">
                    Scheduled date and time
                    <input
                      className="min-h-12 border border-[var(--border)] bg-[var(--field)] px-3 text-[var(--text)] outline-none focus:border-[var(--accent)] transition-colors"
                      type="datetime-local"
                      value={form.scheduledAt}
                      onChange={(e) => updateField("scheduledAt", e.target.value)}
                      min={new Date().toISOString().slice(0, 16)}
                      required
                    />
                    <p className="text-xs text-[var(--secondary)]">
                      The {singularLabel} will appear on the site as soon as a visitor loads it after this time. No backend required.
                    </p>
                  </label>
                )}
              </div>

              {/* Content editor */}
              <div className="grid gap-2 text-sm text-[var(--secondary)]">
                Content
                <div className="flex flex-wrap gap-2 border border-[var(--border)] bg-[var(--surface)] p-2">
                  {[
                    { label: "B", action: () => editor?.chain().focus().toggleBold().run() },
                    { label: "I", action: () => editor?.chain().focus().toggleItalic().run() },
                    { label: "H2", action: () => editor?.chain().focus().toggleHeading({ level: 2 }).run() },
                    { label: "H3", action: () => editor?.chain().focus().toggleHeading({ level: 3 }).run() },
                    { label: "List", action: () => editor?.chain().focus().toggleBulletList().run() },
                    { label: "Quote", action: () => editor?.chain().focus().toggleBlockquote().run() },
                  ].map(({ label, action }) => (
                    <button
                      key={label}
                      className="admin-tool min-w-[2rem] rounded border border-[var(--border)] px-2 py-1 text-xs text-[var(--secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                      type="button"
                      onClick={action}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <EditorContent editor={editor} />
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  className="min-h-12 rounded-full bg-[var(--accent)] px-8 font-bold text-[var(--background)] disabled:opacity-60 hover:opacity-90 transition-opacity"
                  type="submit"
                  disabled={isSaving || isUploading || !canPublish}
                >
                  {isSaving
                    ? "Saving..."
                    : isUploading
                    ? "Uploading..."
                    : form.status === "scheduled"
                    ? `Schedule ${singularLabel}`
                    : isNewPost
                    ? "Publish"
                    : "Save changes"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    resetEditor();
                    setSelectedSlug(null);
                    setIsNewPost(false);
                  }}
                  className="min-h-12 rounded-full border border-[var(--border)] px-6 text-sm text-[var(--secondary)] hover:border-[var(--text)] transition-colors"
                >
                  Cancel
                </button>
                {status && (
                  <p className="text-sm text-[var(--secondary)]">{status}</p>
                )}
              </div>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
