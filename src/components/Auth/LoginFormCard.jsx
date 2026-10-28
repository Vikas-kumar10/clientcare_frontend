
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Eye,
  EyeOff,
  Headset,
  LockKeyhole,
  Mail,
} from "lucide-react";

import { loginAdmin, loginUser } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";

export default function LoginFormCard({ requiredRole = null }) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const reduceMotion = useReducedMotion();
  const navigate = useNavigate();
  const { login } = useAuth();

  const inputClass =
    "w-full rounded-xl border border-stone-200 bg-[#FFFEFC] py-3 pl-11 pr-4 text-sm text-[#292524] outline-none transition-all duration-200 placeholder:text-stone-400 hover:border-stone-300 focus:border-[#C2410C] focus:bg-white focus:ring-4 focus:ring-orange-100/80";

  function handleChange(event) {
    setError("");

    setFormData((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!formData.email.trim() || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      // Call backend login API
      const loginRequest = requiredRole === "admin" ? loginAdmin : loginUser;
      const data = await loginRequest({
        email: formData.email.trim(),
        password: formData.password,
      });

      if (!data?.token || !data?.user) {
        throw new Error("Login response is missing account details.");
      }

      if (requiredRole && data.user.role !== requiredRole) {
        setError("This login page is for administrators. Use an admin account.");
        return;
      }

      login(data.user, data.token);

      // Open dashboard according to role
      switch (data.user.role) {
        case "client":
          navigate("/client", { replace: true });
          break;

        case "developer":
          navigate("/developer", { replace: true });
          break;

        case "admin":
          navigate("/admin", { replace: true });
          break;

        default:
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setError("Invalid user role. Please contact the administrator.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to log in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function reveal(delay = 0) {
    if (reduceMotion) return {};

    return {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, delay, ease: "easeOut" },
    };
  }

  return (
    <section className="flex min-w-0 flex-col justify-center p-5 sm:p-7 lg:p-8 xl:p-10">
      {/* Mobile brand */}
      <motion.div
        {...reveal(0)}
        className="mb-5 flex items-center gap-3 lg:hidden"
      >
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#C2410C] text-white">
          <Headset size={22} />
        </div>

        <p className="text-xl font-extrabold tracking-tight">
          Client<span className="text-[#C2410C]">Care</span>
        </p>
      </motion.div>

      {/* Heading */}
      <motion.div {...reveal(0.08)}>
        <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-[#C2410C] ring-1 ring-orange-100">
          <LockKeyhole size={18} />
        </div>

        <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#C2410C]">
          Welcome back
        </p>

        <h2 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight text-[#292524] sm:text-3xl">
          Sign in to your
          <span className="block text-[#C2410C]">
            workspace.
          </span>
        </h2>
      </motion.div>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        {/* Email */}
        <motion.div {...reveal(0.16)}>
          <label
            htmlFor="login-email"
            className="mb-1.5 block text-sm font-bold text-stone-700"
          >
            Email address
          </label>

          <div className="group relative">
            <Mail
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 transition-colors group-focus-within:text-[#C2410C]"
            />

            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>
        </motion.div>

        {/* Password */}
        <motion.div {...reveal(0.24)}>
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <label
              htmlFor="login-password"
              className="text-sm font-bold text-stone-700"
            >
              Password
            </label>

            <Link
              to="/forgot-password"
              className="text-xs font-semibold text-[#C2410C] transition hover:text-[#9A3412]"
            >
              Forgot password?
            </Link>
          </div>

          <div className="group relative">
            <LockKeyhole
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 transition-colors group-focus-within:text-[#C2410C]"
            />

            <input
              id="login-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className={`${inputClass} pr-12`}
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword((previous) => !previous)
              }
              aria-label={
                showPassword ? "Hide password" : "Show password"
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-stone-400 transition hover:text-[#C2410C] focus:outline-none focus:ring-2 focus:ring-orange-200"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </motion.div>

        {/* API error */}
        {error && (
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs font-medium text-red-700"
          >
            {error}
          </motion.p>
        )}

        {/* Submit */}
        <motion.div {...reveal(0.32)} className="pt-1">
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={reduceMotion ? {} : { y: -2 }}
            whileTap={reduceMotion ? {} : { scale: 0.985 }}
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#C2410C] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-900/15 transition-colors hover:bg-[#9A3412] focus:outline-none focus:ring-4 focus:ring-orange-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in to ClientCare"}

            {!loading && (
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            )}
          </motion.button>
        </motion.div>
      </form>

      {/* Signup */}
      <motion.div {...reveal(0.4)}>
        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-stone-200" />

          <span className="text-[10px] font-bold tracking-[0.13em] text-stone-400">
            NEW TO CLIENTCARE?
          </span>

          <div className="h-px flex-1 bg-stone-200" />
        </div>

        <Link
          to="/signup"
          className="group flex w-full items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-bold text-stone-700 transition-all hover:border-orange-200 hover:bg-orange-50/70 hover:text-[#C2410C]"
        >
          Create a new account

          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </motion.div>
    </section>
  );
}
