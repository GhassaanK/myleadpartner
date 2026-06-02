export default function Loading() {
  return (
    <main className="min-h-screen bg-[var(--background)] px-6 py-28 text-[var(--text)]">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div className="grid gap-5">
          <div className="h-4 w-36 animate-pulse rounded-full bg-[var(--surface)]" />
          <div className="h-16 w-full max-w-2xl animate-pulse rounded bg-[var(--surface)] md:h-24" />
          <div className="h-5 w-full max-w-xl animate-pulse rounded bg-[var(--surface)]" />
          <div className="h-5 w-3/4 max-w-lg animate-pulse rounded bg-[var(--surface)]" />
          <div className="flex gap-3">
            <div className="h-12 w-44 animate-pulse rounded-full bg-[var(--surface)]" />
            <div className="h-12 w-36 animate-pulse rounded-full bg-[var(--surface)]" />
          </div>
        </div>
        <div className="aspect-[4/5] animate-pulse rounded-lg border border-[var(--border)] bg-[var(--surface)]" />
      </div>
    </main>
  );
}
