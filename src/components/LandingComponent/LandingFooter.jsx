import { Link } from "react-router-dom";
import { Headset } from "lucide-react";

export default function LandingFooter() {
  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-5 py-8 sm:flex-row sm:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#C2410C] text-white">
            <Headset size={20} />
          </span>
          <span className="text-xl font-extrabold">
            Client<span className="text-[#C2410C]">Care</span>
          </span>
        </Link>

        <p className="text-center text-sm text-stone-500">
          © 2026 ClientCare. Built for better client support.
        </p>

        <div className="flex gap-5 text-sm font-medium text-stone-600">
          <Link to="/login" className="hover:text-[#C2410C]">
            Login
          </Link>
          <Link to="/signup" className="hover:text-[#C2410C]">
            Sign up
          </Link>
        </div>
      </div>
    </footer>
  );
}