import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Check,
  Code2,
  Eye,
  EyeOff,
  Headset,
  LockKeyhole,
  Mail,
  UserRound,
  Users,
} from "lucide-react";
import { registerUser } from "../../api/authApi.js";

export default function SignupFormCard({ initialRole = "" }) {
  const reduceMotion = useReducedMotion();
  const navigate = useNavigate();

  const [role, setRole] = useState(
    ["client", "developer"].includes(initialRole) ? initialRole : ""
  );

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(event) {
    setFormData((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));

    if (error) setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!role) {
      setError("Please select an account type.");
      return;
    }

    if (formData.name.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }

    const email = formData.email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const data = await registerUser({
        name: formData.name.trim(),
        email,
        password: formData.password,
        role,
      });

      if (!data?.token || !data?.user) {
        throw new Error("Registration response is missing account details.");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to register. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-stone-200 bg-[#FFFEFC] py-2.5 pl-11 pr-4 text-sm text-[#292524] outline-none transition-all duration-200 placeholder:text-stone-400 hover:border-stone-300 focus:border-[#C2410C] focus:bg-white focus:ring-4 focus:ring-orange-100/80";

  const roleCardClass = (selected) =>
    `rounded-xl border p-2.5 text-left transition sm:p-3 ${
      selected
        ? "border-[#C2410C] bg-orange-50 ring-2 ring-orange-100"
        : "border-stone-200 hover:border-orange-300"
    }`;

  return (
    <motion.section
      initial={reduceMotion ? false : { opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
      className="flex min-w-0 flex-col justify-center p-5 sm:p-7 lg:p-6 xl:p-8"
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mb-3 flex items-center gap-3 lg:hidden"
      >
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#C2410C] text-white">
          <Headset size={22} />
        </div>

        <p className="text-xl font-extrabold tracking-tight">
          Client<span className="text-[#C2410C]">Care</span>
        </p>
      </motion.div>

      <div>
        <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-[#C2410C] ring-1 ring-orange-100">
          <UserRound size={18} />
        </div>

        <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#C2410C]">
          Create your account
        </p>

        <h2 className="mt-1.5 text-2xl font-extrabold leading-tight tracking-tight text-[#292524] sm:text-3xl">
          Join the
          <span className="block text-[#C2410C]">
            ClientCare workspace.
          </span>
        </h2>

        <p className="mt-1.5 text-sm text-stone-600">
          Select your account type to get started.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        {/* Account type */}
        <fieldset>
          <legend className="mb-2 block text-sm font-bold text-stone-700">
            Account type <span className="text-[#C2410C]">*</span>
          </legend>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              aria-pressed={role === "client"}
              onClick={() => {
                setRole("client");
                setError("");
              }}
              className={roleCardClass(role === "client")}
            >
              <div className="flex items-center justify-between">
                <Users
                  size={22}
                  className={
                    role === "client"
                      ? "text-[#C2410C]"
                      : "text-stone-500"
                  }
                />

                {role === "client" && (
                  <Check size={17} className="text-[#C2410C]" />
                )}
              </div>

              <p className="mt-1 font-bold">Client</p>
              <p className="mt-0.5 text-xs leading-4 text-stone-500">
                Report and track issues
              </p>
            </button>

            <button
              type="button"
              aria-pressed={role === "developer"}
              onClick={() => {
                setRole("developer");
                setError("");
              }}
              className={roleCardClass(role === "developer")}
            >
              <div className="flex items-center justify-between">
                <Code2
                  size={22}
                  className={
                    role === "developer"
                      ? "text-[#C2410C]"
                      : "text-stone-500"
                  }
                />

                {role === "developer" && (
                  <Check size={17} className="text-[#C2410C]" />
                )}
              </div>

              <p className="mt-1 font-bold">Developer</p>
              <p className="mt-0.5 text-xs leading-4 text-stone-500">
                Work on assigned tickets
              </p>
            </button>
          </div>
        </fieldset>

        {/* Full name */}
        <div>
          <label
            htmlFor="signup-name"
            className="mb-1.5 block text-sm font-bold text-stone-700"
          >
            Full name
          </label>

          <div className="group relative">
            <UserRound
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 transition-colors group-focus-within:text-[#C2410C]"
            />

            <input
              id="signup-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
              minLength={2}
              required
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="signup-email"
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
              id="signup-email"
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
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="signup-password"
            className="mb-1.5 block text-sm font-bold text-stone-700"
          >
            Password
          </label>

          <div className="group relative">
            <LockKeyhole
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 transition-colors group-focus-within:text-[#C2410C]"
            />

            <input
              id="signup-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="At least 6 characters"
              value={formData.password}
              onChange={handleChange}
              className={`${inputClass} pr-12`}
              minLength={6}
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-stone-400 transition hover:text-[#C2410C] focus:outline-none focus:ring-2 focus:ring-orange-200"
            >
              {showPassword ? (
                <EyeOff size={19} />
              ) : (
                <Eye size={19} />
              )}
            </button>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <p
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        {/* Submit */}
        <motion.button
          whileHover={reduceMotion ? undefined : { y: -1 }}
          whileTap={reduceMotion ? undefined : { scale: 0.99 }}
          type="submit"
          disabled={loading}
          className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#C2410C] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-900/15 transition-colors hover:bg-[#9A3412] focus:outline-none focus:ring-4 focus:ring-orange-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Creating account..."
            : `Create ${role ? `${role} account` : "account"}`}

          {!loading && <ArrowRight size={18} />}
        </motion.button>

        <p className="text-center text-xs leading-5 text-stone-500">
          By continuing, you agree to use ClientCare responsibly.
        </p>
      </form>

      <p className="mt-3 text-center text-sm text-stone-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-bold text-[#C2410C] hover:underline"
        >
          Log in
        </Link>
      </p>
    </motion.section>
  );
}

