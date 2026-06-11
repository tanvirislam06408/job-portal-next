import NotAuthorized from "@/components/NotAuthorized";

export const metadata = {
  title: "Unauthorized | HireLoop",
};

export default function UnauthorizedPage() {
  return (
    <section className="min-h-[calc(100vh-160px)] bg-[#0a0a0c] text-white">
      <div className="mx-auto flex min-h-[calc(100vh-160px)] max-w-5xl items-center justify-center px-4 py-16">
        <div className="w-full rounded-xl border border-zinc-800 bg-[#111111] p-6 shadow-xl shadow-black/20 sm:p-10">
          <NotAuthorized
            title="Recruiter Access Required"
            description="You need a recruiter account to view the recruiter dashboard."
            actionLabel="Go to Login"
            actionHref="/login"
          />
        </div>
      </div>
    </section>
  );
}
