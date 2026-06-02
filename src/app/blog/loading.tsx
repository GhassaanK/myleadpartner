export default function BlogLoading() {
  return (
    <main className="min-h-screen bg-[var(--background)] px-6 py-14 text-[var(--text)]">
      <div className="mx-auto max-w-3xl">
        <div className="h-9 w-40 animate-pulse rounded bg-[var(--surface)]" />
        <div className="mt-5 h-5 w-full animate-pulse rounded bg-[var(--surface)]" />
        <div className="mt-10 grid gap-5">
          {[0, 1, 2].map((item) => (
            <div key={item} className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
              <div className="h-4 w-24 animate-pulse rounded bg-[var(--raised)]" />
              <div className="mt-5 h-7 w-4/5 animate-pulse rounded bg-[var(--raised)]" />
              <div className="mt-4 h-4 w-full animate-pulse rounded bg-[var(--raised)]" />
              <div className="mt-3 h-4 w-2/3 animate-pulse rounded bg-[var(--raised)]" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
