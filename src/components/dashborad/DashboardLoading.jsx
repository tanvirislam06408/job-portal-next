export default function DashboardLoading({ label = "Loading dashboard" }) {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center bg-[#0a0a0c] px-4 py-12 text-white md:min-h-screen">
      <div className="w-full max-w-sm rounded-xl border border-zinc-800 bg-[#111111] p-8 text-center shadow-xl shadow-black/20">
        <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center">
          <div className="absolute h-full w-full rounded-full border border-zinc-800" />
          <div className="absolute h-full w-full animate-spin rounded-full border-2 border-transparent border-t-white border-r-zinc-500" />
          <div className="h-10 w-10 rounded-lg border border-zinc-800 bg-zinc-900" />
        </div>

        <h2 className="text-lg font-semibold text-white">{label}</h2>
        <p className="mt-2 text-sm text-zinc-400">
          Preparing your workspace...
        </p>
      </div>
    </div>
  );
}
