import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import DashboardPreview from "./DashboardPreview";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-24 -top-20 h-80 w-80 rounded-full bg-orange-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-amber-100/70 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2 lg:py-15">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-[#C2410C]">
            <span className="h-2 w-2 rounded-full bg-[#FB923C]" />
            Support that keeps projects moving
          </div>

          <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Better support.
            <span className="mt-2 block text-[#C2410C]">
              Happier clients.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-stone-600 sm:text-lg">
            Report software issues, connect with your support team, and track
            every fix. ClientCare brings clients, admins, and developers
            together in one simple workspace.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C2410C] px-6 py-3.5 font-semibold text-white shadow-lg shadow-orange-900/10 transition hover:-translate-y-0.5 hover:bg-[#9A3412]"
            >
              Create an account
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-xl border border-stone-300 bg-white px-6 py-3.5 font-semibold transition hover:border-orange-300 hover:bg-orange-50"
            >
              Log in to ClientCare
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm text-stone-600">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-[#C2410C]" />
              Simple ticket tracking
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-[#C2410C]" />
              Clear status updates
            </span>
          </div>
        </div>

        <DashboardPreview />
      </div>
    </section>
  );
}