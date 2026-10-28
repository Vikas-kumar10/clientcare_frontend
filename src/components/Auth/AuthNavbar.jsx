import { Link, useLocation } from "react-router-dom";
import { Headset, ArrowRight } from "lucide-react";

export default function AuthNavbar() {
  const location = useLocation();
  const isSignup = location.pathname === "/signup";

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-[#FAF7F2]/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#C2410C] text-white">
            <Headset size={23} />
          </span>
          <span className="text-2xl font-extrabold tracking-tight text-[#292524]">
            Client<span className="text-[#C2410C]">Care</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-stone-600 sm:inline">
            {isSignup ? "Already have an account?" : "Already a member?"}
          </span>

          <Link
            to={isSignup ? "/login" : "/signup"}
            className="inline-flex items-center gap-2 rounded-xl bg-[#C2410C] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#9A3412]"
          >
            {isSignup ? "Log in" : "Get started"}
            <ArrowRight size={16} />
          </Link>
        </div>
      </nav>
    </header>
  );
}