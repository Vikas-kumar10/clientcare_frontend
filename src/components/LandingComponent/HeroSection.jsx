
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
} from "lucide-react";
import DashboardPreview from "./DashboardPreview";

export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#FAF7F2]">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -right-24 top-10 -z-10 h-64 w-64 rounded-full bg-orange-200/40 blur-3xl sm:h-80 sm:w-80" />

      <div className="pointer-events-none absolute -bottom-20 -left-20 -z-10 h-64 w-64 rounded-full bg-amber-100/70 blur-3xl" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-9 px-4 py-10 sm:px-6 sm:py-16 md:px-8 lg:grid-cols-2 lg:gap-12 lg:px-10 lg:py-24">

        {/* Hero Content */}
        <div className="min-w-0 text-center lg:text-left">

          {/* Mobile-friendly Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/90 px-3 py-2 text-[11px] font-bold text-[#C2410C] shadow-sm sm:mb-6 sm:px-4 sm:text-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#C2410C]" />
            </span>
            SUPPORT THAT KEEPS PROJECTS MOVING
          </div>

          {/* Heading */}
          <h1 className="mx-auto max-w-2xl text-[2.55rem] font-extrabold leading-[1.08] tracking-[-0.045em] text-[#292524] sm:text-5xl sm:leading-[1.1] lg:mx-0 lg:text-6xl">
            Better support.
            <span className="mt-1 block text-[#C2410C] sm:mt-2">
              Happier clients.
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-lg text-[14px] leading-7 text-stone-600 sm:mt-6 sm:text-base sm:leading-8 lg:mx-0 lg:text-lg">
            Report software issues, connect with your support team, and track
            every fix. Everything your support team needs, in one simple
            workspace.
          </p>

          {/* CTA Buttons */}
          <div className="mx-auto mt-7 grid max-w-md grid-cols-1 gap-3 sm:flex sm:max-w-none sm:flex-row sm:justify-center lg:mx-0 lg:justify-start">

            <Link
              to="/signup"
              className="group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-[#C2410C] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-900/15 transition duration-300 hover:-translate-y-0.5 hover:bg-[#9A3412] active:translate-y-0 sm:text-base"
            >
              Get started for free
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/login"
              className="inline-flex min-h-[52px] items-center justify-center rounded-2xl border border-stone-200 bg-white px-6 py-3.5 text-sm font-bold text-[#292524] transition hover:border-orange-300 hover:bg-orange-50 sm:text-base"
            >
              Log in
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-xs font-medium text-stone-600 sm:mt-8 sm:gap-x-6 sm:text-sm lg:justify-start">

            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 size={16} className="shrink-0 text-[#C2410C]" />
              Easy ticket tracking
            </span>

            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck size={16} className="shrink-0 text-[#C2410C]" />
              Clear updates
            </span>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="relative mx-auto w-full min-w-0 max-w-xl lg:max-w-none">
          {/* Mobile Preview Label */}
          <div className="mb-3 flex items-center justify-between px-1 sm:mb-4 lg:hidden">
            <div>
              <p className="text-sm font-bold text-[#292524]">
                Your support workspace
              </p>
              <p className="mt-0.5 text-xs text-stone-500">
                Everything in one place
              </p>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-white px-2.5 py-1.5 text-[10px] font-bold text-[#C2410C]">
              <Zap size={12} />
              LIVE OVERVIEW
            </span>
          </div>

          <div className="min-w-0 rounded-2xl border border-white/80 bg-white/60 p-1.5 shadow-[0_18px_55px_-25px_rgba(124,45,18,0.25)] sm:rounded-3xl sm:p-3 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">
            <DashboardPreview />
          </div>
        </div>

      </div>
    </section>
  );
}
