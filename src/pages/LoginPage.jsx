
import { motion, useReducedMotion } from "motion/react";
import AuthNavbar from "../components/Auth/AuthNavbar";
import AuthFooter from "../components/Auth/AuthFooter";
import LoginBrandCard from "../components/Auth/LoginBrandCard";
import LoginFormCard from "../components/Auth/LoginFormCard";

const bubbles = [
  { size: 100, left: "4%", top: "12%", duration: 12 },
  { size: 150, left: "80%", top: "8%", duration: 16 },
  { size: 45, left: "88%", top: "48%", duration: 10 },
  { size: 75, left: "8%", top: "75%", duration: 13 },
  { size: 125, left: "73%", top: "80%", duration: 15 },
  { size: 32, left: "48%", top: "18%", duration: 9 },
];

export default function LoginPage() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative flex min-h-dvh flex-col overflow-x-clip bg-[#FAF7F2] text-[#292524]">
      <AuthNavbar />

      <main className="relative isolate flex flex-1 items-center justify-center px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-6">
        {/* Floating bubble background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl" />

          <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-amber-200/30 blur-3xl" />

          {bubbles.map((bubble, index) => (
            <motion.div
              key={index}
              className="absolute rounded-full border border-[#C2410C]/10 bg-orange-100/20 shadow-[inset_0_0_20px_rgba(194,65,12,0.04)]"
              style={{
                width: bubble.size,
                height: bubble.size,
                left: bubble.left,
                top: bubble.top,
              }}
              animate={
                reduceMotion
                  ? {}
                  : {
                      y: [0, -18, 8, 0],
                      x: [0, 10, -6, 0],
                      scale: [1, 1.05, 0.97, 1],
                    }
              }
              transition={{
                duration: bubble.duration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Login cards */}
        <motion.div
          initial={
            reduceMotion ? false : { opacity: 0, y: 16, scale: 0.99 }
          }
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-[24px] border border-white/80 bg-white/90 shadow-[0_20px_60px_-25px_rgba(68,42,24,0.20)] backdrop-blur-xl lg:grid-cols-2"
        >
          <LoginBrandCard />
          <LoginFormCard />
        </motion.div>
      </main>

      <AuthFooter />
    </div>
  );
}
