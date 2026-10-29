
import { Link } from "react-router-dom";
import { ArrowUpRight, Headset } from "lucide-react";

export default function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-[#FAF7F2]/95 backdrop-blur-xl">
      <nav
        className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:px-6 sm:py-3.5 lg:px-10"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          to="/"
          className="group flex min-w-0 shrink items-center gap-2 sm:gap-3"
          aria-label="ClientCare home"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#C2410C] text-white shadow-sm shadow-orange-900/15 transition duration-300 group-hover:-rotate-3 group-hover:scale-105 sm:h-11 sm:w-11 sm:rounded-2xl">
            <Headset
              size={20}
              strokeWidth={2.1}
              className="sm:h-23px sm:w-23px"
            />
          </span>

          <span className="flex min-w-0 flex-col">
            <span className="whitespace-nowrap text-lg font-extrabold leading-tight tracking-tight text-[#292524] sm:text-2xl">
              Client<span className="text-[#C2410C]">Care</span>
            </span>

            <span className="mt-1 hidden whitespace-nowrap text-[9px] font-bold tracking-[0.14em] text-stone-500 sm:block sm:tracking-[0.19em]">
              CUSTOMER SUPPORT PLATFORM
            </span>
          </span>
        </Link>

        {/* Navigation Actions */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          <Link
            to="/login"
            className="inline-flex items-center justify-center rounded-lg px-2.5 py-2.5 text-xs font-semibold text-stone-700 transition-colors duration-200 hover:bg-orange-100/70 hover:text-[#C2410C] sm:rounded-xl sm:px-4 sm:text-sm"
          >
            Log in
          </Link>

          <Link
            to="/signup"
            className="group inline-flex items-center justify-center gap-1 rounded-lg bg-[#C2410C] px-2.5 py-2.5 text-xs font-semibold text-white shadow-md shadow-orange-900/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#9A3412] hover:shadow-lg active:translate-y-0 sm:gap-2 sm:rounded-xl sm:px-5 sm:py-3 sm:text-sm"
          >
            <span>Get started</span>

            <ArrowUpRight
              size={15}
              strokeWidth={2.2}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-17px sm:w-17px"
            />
          </Link>
        </div>
      </nav>
    </header>
  );
}
