
import { useEffect } from "react";
import {
  motion,
  useAnimationControls,
  useReducedMotion,
} from "motion/react";
import {
  ArrowUpRight,
  BellRing,
  CheckCircle2,
  ClipboardCheck,
  MessageCircle,
  ShieldCheck,
  Ticket,
  Users,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Ticket,
    number: "01",
    title: "Smart Ticket Management",
    description:
      "Create support tickets, organize requests, and keep every issue moving toward resolution.",
    tag: "Ticket tracking",
    iconBg: "bg-orange-100",
    iconColor: "text-[#C2410C]",
  },
  {
    icon: MessageCircle,
    number: "02",
    title: "Clear Communication",
    description:
      "Keep client and developer conversations together with updates that are easy to follow.",
    tag: "Team collaboration",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-700",
  },
  {
    icon: ClipboardCheck,
    number: "03",
    title: "Track Every Progress",
    description:
      "See ticket status, ownership, priorities, and the next step without confusion.",
    tag: "Progress tracking",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-700",
  },
  {
    icon: BellRing,
    number: "04",
    title: "Stay in the Loop",
    description:
      "Keep important updates visible so teams can respond to changes and deadlines.",
    tag: "Notifications",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-700",
  },
  {
    icon: Users,
    number: "05",
    title: "One Connected Team",
    description:
      "Bring clients, support teams, and developers together in one shared workspace.",
    tag: "Team workspace",
    iconBg: "bg-orange-100",
    iconColor: "text-[#C2410C]",
  },
  {
    icon: ShieldCheck,
    number: "06",
    title: "Organized Ownership",
    description:
      "Make responsibilities clear so every request has someone accountable for the next step.",
    tag: "Clear ownership",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-700",
  },
];

function FeatureCard({ feature, reduceMotion }) {
  const Icon = feature.icon;

  return (
    <motion.article
      whileHover={reduceMotion ? undefined : { y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group relative flex min-h-[260px] w-[280px] shrink-0 flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-orange-200 hover:shadow-[0_14px_35px_rgba(194,65,12,0.10)] sm:w-[320px] sm:p-6"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-orange-50 transition-transform duration-500 group-hover:scale-150"
      />

      <div className="relative flex items-start justify-between">
        <div
          className={`grid h-12 w-12 place-items-center rounded-2xl ${feature.iconBg} ${feature.iconColor} transition-transform duration-300 group-hover:rotate-[-5deg]`}
        >
          <Icon size={23} strokeWidth={1.8} />
        </div>

        <span className="font-mono text-xs font-semibold tracking-wider text-stone-300">
          /{feature.number}
        </span>
      </div>

      <h3 className="relative mt-6 text-lg font-bold tracking-tight text-[#292524] sm:text-xl">
        {feature.title}
      </h3>

      <p className="relative mt-3 text-sm leading-6 text-stone-600">
        {feature.description}
      </p>

      <div className="relative mt-auto flex items-center justify-between pt-5">
        <span className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-medium text-stone-600">
          {feature.tag}
        </span>

        <span className="grid h-9 w-9 place-items-center rounded-full text-stone-400 transition-colors duration-300 group-hover:bg-[#C2410C] group-hover:text-white">
          <ArrowUpRight size={18} />
        </span>
      </div>
    </motion.article>
  );
}

function FeatureMarquee({ reduceMotion }) {
  const controls = useAnimationControls();

  useEffect(() => {
    if (reduceMotion) {
      controls.stop();
      return;
    }

    controls.start({
      x: ["0%", "-50%"],
      transition: {
        duration: 36,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      },
    });

    return () => controls.stop();
  }, [controls, reduceMotion]);

  const startAnimation = () => {
    if (reduceMotion) return;

    controls.start({
      x: ["0%", "-50%"],
      transition: {
        duration: 36,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      },
    });
  };

  return (
    <div
      className="relative mt-8 overflow-hidden py-3 sm:mt-10"
      onMouseEnter={() => controls.stop()}
      onMouseLeave={startAnimation}
      onFocusCapture={() => controls.stop()}
      onBlurCapture={startAnimation}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-[#FAF7F2] to-transparent sm:w-12"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-[#FAF7F2] to-transparent sm:w-12"
      />

      <motion.div
        animate={reduceMotion ? { x: 0 } : controls}
        className="flex w-max gap-4 pr-4 sm:gap-5 sm:pr-5"
      >
        {[...features, ...features].map((feature, index) => (
          <FeatureCard
            key={`${feature.number}-${index}`}
            feature={feature}
            reduceMotion={reduceMotion}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default function FeaturesSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="features"
      className="relative overflow-hidden border-y border-orange-100 bg-[#FAF7F2] py-10 sm:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section heading */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2">
            <Zap size={15} className="text-[#C2410C]" />

            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#9A3412] sm:text-sm">
              Everything in one place
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-[#292524] sm:text-4xl lg:text-5xl">
            Support without the{" "}
            <span className="relative inline-block text-[#C2410C]">
              confusion.
              <motion.span
                aria-hidden="true"
                initial={reduceMotion ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="absolute -bottom-1 left-0 h-1 w-full origin-left rounded-full bg-orange-300"
              />
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-stone-600 sm:text-base sm:leading-7">
            Bring tickets, conversations, and project updates together.
            Give every request a clear owner, visible status, and path to
            resolution.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-stone-500 sm:text-sm">
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#C2410C]" />
              Easy to track
            </span>

            <span className="inline-flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#C2410C]" />
              Built for teams
            </span>

            <span className="inline-flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#C2410C]" />
              Clear ownership
            </span>
          </div>
        </motion.div>

        {/* Right-to-left animated cards */}
        <FeatureMarquee reduceMotion={reduceMotion} />
      </div>
    </section>
  );
}
