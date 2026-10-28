
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Headset,
  ChevronRight,
} from "lucide-react";

export default function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-[#FAF7F2]/90 backdrop-blur-xl">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8 lg:px-10"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          to="/"
          className="group flex shrink-0 items-center gap-3"
          aria-label="ClientCare home"
        >
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#C2410C] text-white shadow-sm shadow-orange-900/15 transition duration-300 group-hover:-rotate-3 group-hover:scale-105">
            <Headset size={23} strokeWidth={2.1} />
          </span>

          <span className="flex flex-col">
            <span className="text-[1.55rem] font-extrabold leading-none tracking-tight text-[#292524]">
              Client<span className="text-[#C2410C]">Care</span>
            </span>
            <span className="mt-1.5 text-[9px] font-bold tracking-[0.19em] text-stone-500">
              CUSTOMER SUPPORT PLATFORM
            </span>
          </span>
        </Link>

        {/* Navigation actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            to="/login"
            className="hidden rounded-xl px-4 py-2.5 text-sm font-semibold text-stone-700 transition-colors duration-200 hover:bg-orange-100/70 hover:text-[#C2410C] sm:inline-flex"
          >
            Log in
          </Link>

          <Link
            to="/signup"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#C2410C] px-4 py-3 text-sm font-semibold text-white shadow-md shadow-orange-900/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#9A3412] hover:shadow-lg hover:shadow-orange-900/15 active:translate-y-0 sm:px-5"
          >
            <span>Get started</span>
            <ArrowUpRight
              size={17}
              strokeWidth={2.2}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </nav>
    </header>
  );
}
