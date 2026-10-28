import { motion, useReducedMotion } from "motion/react";
import { CheckCircle2, Code2, Headset, ShieldCheck, Sparkles, Users } from "lucide-react";

const textContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14 },
  },
};

const textItem = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export default function SignupBrandCard() {
  const reduceMotion = useReducedMotion();

  const bubbles = [
    { size: 220, right: "-10%", top: "-12%", duration: 14 },
    { size: 150, right: "10%", top: "24%", duration: 17 },
    { size: 90, right: "35%", top: "10%", duration: 12 },
    { size: 190, left: "-12%", bottom: "-15%", duration: 16 },
  ];

  return (
    <section className="relative hidden min-h-0 overflow-hidden bg-[#292524] p-8 text-white lg:flex lg:flex-col lg:justify-between xl:p-10">
      {/* Background glow and floating circles */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#C2410C]/35 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-orange-700/20 blur-3xl" />

        {bubbles.map((bubble, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full border border-white/[0.10] bg-white/[0.025]"
            style={{
              width: bubble.size,
              height: bubble.size,
              right: bubble.right,
              left: bubble.left,
              top: bubble.top,
              bottom: bubble.bottom,
            }}
            animate={
              reduceMotion
                ? {}
                : {
                    y: [0, -16, 8, 0],
                    x: [0, 10, -5, 0],
                    scale: [1, 1.04, 0.98, 1],
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

      {/* Brand */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex items-center gap-3"
      >
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#C2410C] shadow-lg shadow-black/15">
          <Headset size={24} strokeWidth={2} />
        </div>

        <div>
          <p className="text-xl font-extrabold tracking-tight">
            Client<span className="text-orange-400">Care</span>
          </p>
          <p className="mt-1 text-[9px] font-bold tracking-[0.2em] text-stone-400">
            SUPPORT, SIMPLIFIED
          </p>
        </div>
      </motion.div>

      {/* Signup message */}
      <motion.div
        variants={textContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 -mt-2 mb-4"
      >
        <motion.div
          variants={textItem}
          className="mb-2 inline-flex items-center gap-1 rounded-full border border-orange-300/20 bg-orange-300/10 px-3 text-xs font-semibold text-orange-200"
        >
          <Sparkles size={14} />
          Join your support workspace
        </motion.div>

        <motion.h1
          variants={textItem}
          className="text-4xl font-extrabold leading-[1.13] tracking-tight xl:text-[2.8rem]"
        >
          Great support
          <br />
          starts with
          <br />
          <span className="bg-gradient-to-r from-orange-300 via-orange-400 to-amber-200 bg-clip-text text-transparent">
            a fresh start.
          </span>
        </motion.h1>

        <motion.div
          variants={textItem}
          className="mt-5 flex items-center gap-3"
        >
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-orange-400/15 text-orange-300">
            <ShieldCheck size={21} />
          </div>

          <div>
            <p className="text-sm font-semibold">Made for your whole team</p>
            <p className="mt-1 text-xs text-stone-400">
              Clients and developers, working together.
            </p>
          </div>

          <CheckCircle2 size={18} className="ml-auto text-orange-300" />
        </motion.div>
      </motion.div>

      {/* Bottom label */}
      <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-4 text-[11px] text-stone-400">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-orange-400" />
          Built for better support
        </span>
        <span className="flex items-center gap-2">
          <Users size={14} />
          <Code2 size={14} />
          ClientCare © 2026
        </span>
      </div>
    </section>
  );
}
