
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import DashboardPreview from "./DashboardPreview";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -right-24 -top-20 h-48 w-48 rounded-full bg-orange-200/40 blur-3xl sm:h-80 sm:w-80" />

      <div className="pointer-events-none absolute -bottom-10 -left-20 h-48 w-48 rounded-full bg-amber-100/70 blur-3xl sm:h-72 sm:w-72" />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 py-12 sm:gap-12 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:grid-cols-2 lg:gap-12 lg:px-10 lg:py-14 xl:gap-16">

        {/* Hero Content */}
        <div className="min-w-0 text-center lg:text-left">

          {/* Eyebrow Badge */}
          <div className="mb-5 inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-orange-200 bg-white px-3 py-2 text-xs font-semibold leading-relaxed text-[#C2410C] sm:mb-6 sm:px-4 sm:text-sm">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#FB923C]" />
            <span>Support that keeps projects moving</span>
          </div>

          {/* Heading */}
          <h1 className="mx-auto max-w-2xl text-3xl font-extrabold leading-[1.15] tracking-tight text-[#292524] sm:text-4xl md:text-5xl lg:mx-0 lg:text-5xl xl:text-6xl">
            Better support.
            <span className="mt-2 block text-[#C2410C]">
              Happier clients.
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-stone-600 sm:mt-6 sm:text-base sm:leading-8 md:text-lg lg:mx-0">
            Report software issues, connect with your support team, and track
            every fix. ClientCare brings clients, admins, and developers
            together in one simple workspace.
          </p>

          {/* CTA Buttons */}
          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:justify-center lg:justify-start">

            <Link
              to="/signup"
              className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#C2410C] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-900/10 transition duration-300 hover:-translate-y-0.5 hover:bg-[#9A3412] active:translate-y-0 sm:w-auto sm:px-6 sm:py-3.5 sm:text-base"
            >
              Create an account

              <ArrowRight
                size={18}
                className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/login"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-800 transition duration-300 hover:border-orange-300 hover:bg-orange-50 sm:w-auto sm:px-6 sm:py-3.5 sm:text-base"
            >
              Log in to ClientCare
            </Link>
          </div>

          {/* Benefits */}
          <div className="mt-7 flex flex-col items-center justify-center gap-3 text-sm text-stone-600 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-3 lg:justify-start">

            <span className="flex items-center gap-2">
              <CheckCircle2
                size={17}
                className="shrink-0 text-[#C2410C]"
              />
              Simple ticket tracking
            </span>

            <span className="flex items-center gap-2">
              <CheckCircle2
                size={17}
                className="shrink-0 text-[#C2410C]"
              />
              Clear status updates
            </span>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="min-w-0 w-full">
          <DashboardPreview />
        </div>

      </div>
    </section>
  );
}
