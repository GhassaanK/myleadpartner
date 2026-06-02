export default function CaseStudiesLoading() {
  return (
    <main className="min-h-screen bg-[var(--background)] px-6 py-14 text-[var(--text)]">
      <div className="mx-auto max-w-5xl">
        <div className="h-10 w-56 animate-pulse rounded bg-[var(--surface)]" />
        <div className="mt-5 h-5 w-full max-w-2xl animate-pulse rounded bg-[var(--surface)]" />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {[0, 1, 2, 3].map((item) => (
            <div key={item} className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
              <div className="aspect-[16/10] animate-pulse bg-[var(--raised)]" />
              <div className="p-6">
                <div className="h-4 w-24 animate-pulse rounded bg-[var(--raised)]" />
                <div className="mt-5 h-8 w-4/5 animate-pulse rounded bg-[var(--raised)]" />
                <div className="mt-4 h-4 w-full animate-pulse rounded bg-[var(--raised)]" />
                <div className="mt-3 h-4 w-2/3 animate-pulse rounded bg-[var(--raised)]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
