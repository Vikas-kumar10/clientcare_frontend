import { Link } from "react-router-dom";
import { ArrowRight, FolderKanban } from "lucide-react";

export default function DeveloperWelcome({ name = "Developer" }) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-[#292524] p-6 text-white sm:p-8">
      <div className="relative z-10 max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-orange-200">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Developer workspace
        </span>

        <h1 className="mt-5 text-2xl font-extrabold tracking-tight sm:text-3xl">
          Welcome back, {name}!
        </h1>

        <p className="mt-3 max-w-xl text-sm leading-6 text-stone-300 sm:text-base">
          Review your assigned tickets, work on client issues and keep
          everyone updated on your progress.
        </p>

        <Link
          to="/developer/tickets"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#C2410C] px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-700"
        >
          View assigned tickets
          <ArrowRight size={17} />
        </Link>
      </div>

      <div className="pointer-events-none absolute -right-8 -top-10 hidden h-64 w-64 items-center justify-center rounded-full border border-white/10 sm:flex">
        <div className="flex h-48 w-48 items-center justify-center rounded-full border border-white/10">
          <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-white/10 text-orange-300">
            <FolderKanban size={48} />
          </div>
        </div>
      </div>
    </section>
  );
}