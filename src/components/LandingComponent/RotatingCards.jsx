
import { motion, useReducedMotion } from "motion/react";
import {
  Ticket,
  UserCheck,
  MessageCircle,
  Activity,
  FolderKanban,
  ShieldCheck,
} from "lucide-react";

const cards = [
  {
    title: "Easy Ticket Submission",
    description:
      "Clients can report technical issues with descriptions and priority levels.",
    icon: Ticket,
    number: "01",
  },
  {
    title: "Smart Ticket Assignment",
    description:
      "Admins review tickets and assign the right developer for resolution.",
    icon: UserCheck,
    number: "02",
  },
  {
    title: "Project Management",
    description:
      "Manage client projects and keep all support activities organized.",
    icon: FolderKanban,
    number: "03",
  },
  {
    title: "Team Collaboration",
    description:
      "Clients, admins, and developers communicate through ticket conversations.",
    icon: MessageCircle,
    number: "04",
  },
  {
    title: "Track Every Update",
    description:
      "Monitor ticket progress, assignments, and resolution status.",
    icon: Activity,
    number: "05",
  },
  {
    title: "Secure Role Access",
    description:
      "Separate dashboards and permissions for clients, admins, and developers.",
    icon: ShieldCheck,
    number: "06",
  },
];

const desktopPositions = [
  { x: -215, y: -145 },
  { x: 0, y: -220 },
  { x: 215, y: -145 },
  { x: 215, y: 145 },
  { x: 0, y: 220 },
  { x: -215, y: 145 },
];

const tabletPositions = [
  { x: -170, y: -125 },
  { x: 0, y: -190 },
  { x: 170, y: -125 },
  { x: 170, y: 125 },
  { x: 0, y: 190 },
  { x: -170, y: 125 },
];

const mobilePositions = [
  { x: -90, y: -115 },
  { x: 0, y: -205 },
  { x: 90, y: -115 },
  { x: 90, y: 115 },
  { x: 0, y: 205 },
  { x: -90, y: 115 },
];

export default function RotatingCards() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="w-full overflow-hidden bg-[#FAF7F2] px-4 py-14 sm:px-6 sm:py-16 lg:py-20">

      {/* Heading */}
      <div className="mx-auto mb-8 w-full max-w-3xl text-center sm:mb-12">

        <span className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-[#C2410C] sm:text-sm">
          Why ClientCare
        </span>

        <motion.h1
          className="mt-3 text-2xl font-bold leading-tight tracking-tight text-[#292524] sm:text-3xl md:text-4xl lg:text-5xl"
          initial={
            shouldReduceMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 25 }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          Complete Support
          <span className="block text-[#C2410C]">
            Management Platform
          </span>
        </motion.h1>

      </div>

      {/* Animation Area */}
      <div className="relative mx-auto flex h-[450px] w-full max-w-[760px] items-center justify-center sm:h-[520px] md:h-[570px]">

        {/* Center Circle */}
        <div className="absolute z-20 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-[#C2410C] shadow-xl shadow-orange-900/20 sm:h-24 sm:w-24 md:h-28 md:w-28">

          <span className="text-xl font-bold text-white sm:text-2xl">
            CC
          </span>

          <span className="text-[7px] font-semibold tracking-widest text-orange-100 sm:text-[9px]">
            CLIENTCARE
          </span>

        </div>

        {/* Cards */}
        {cards.map((card, index) => {
          const Icon = card.icon;

          const desktop = desktopPositions[index];
          const tablet = tabletPositions[index];
          const mobile = mobilePositions[index];

          return (
            <motion.div
              key={card.number}
              className="
                absolute z-10
                flex h-[105px] w-[105px]
                flex-col items-center justify-center
                rounded-xl border border-orange-100
                bg-white p-2 text-center shadow-lg

                sm:h-[145px] sm:w-[150px] sm:rounded-2xl sm:p-4
                md:h-[165px] md:w-[185px] md:p-5
              "
              initial={
                shouldReduceMotion
                  ? {
                      x: desktop.x,
                      y: desktop.y,
                      opacity: 1,
                      scale: 1,
                    }
                  : {
                      x: 0,
                      y: 0,
                      opacity: 0,
                      scale: 0.5,
                    }
              }
              animate={
                shouldReduceMotion
                  ? {
                      x: desktop.x,
                      y: desktop.y,
                      opacity: 1,
                      scale: 1,
                    }
                  : {
                      x: [
                        0,
                        -100,
                        -180,
                        -100,
                        desktop.x,
                      ],
                      y: [
                        0,
                        100,
                        -100,
                        -220,
                        desktop.y,
                      ],
                      opacity: 1,
                      scale: 1,
                    }
              }
              transition={{
                duration: shouldReduceMotion ? 0 : 1.8,
                delay: shouldReduceMotion ? 0 : index * 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                scale: 1.06,
                borderColor: "#C2410C",
                boxShadow: "0px 15px 35px rgba(194,65,12,0.18)",
              }}
              style={{
                "--desktop-x": `${desktop.x}px`,
                "--desktop-y": `${desktop.y}px`,
                "--tablet-x": `${tablet.x}px`,
                "--tablet-y": `${tablet.y}px`,
                "--mobile-x": `${mobile.x}px`,
                "--mobile-y": `${mobile.y}px`,
              }}
            >

              {/* Icon */}
              <div className="mb-1.5 flex h-7 w-7 items-center justify-center rounded-lg bg-orange-50 text-[#C2410C] sm:mb-2 sm:h-10 sm:w-10 md:h-12 md:w-12">

                <Icon size={19} className="sm:h-6 sm:w-6" />

              </div>

              {/* Number */}
              <span className="mb-1 text-[9px] font-bold text-[#C2410C] sm:text-[10px]">
                {card.number}
              </span>

              {/* Title */}
              <h3 className="text-[10px] font-bold leading-tight text-[#292524] sm:text-xs md:text-sm">
                {card.title}
              </h3>

              {/* Description */}
              <p className="mt-2 hidden text-[10px] leading-relaxed text-stone-500 md:block">
                {card.description}
              </p>

            </motion.div>
          );
        })}

        {/* Responsive card positions */}
        <style>{`
          @media (max-width: 639px) {
            .relative > div[style*="--desktop-x"] {
              transform: translate(
                var(--mobile-x),
                var(--mobile-y)
              );
            }
          }

          @media (min-width: 640px) and (max-width: 767px) {
            .relative > div[style*="--desktop-x"] {
              transform: translate(
                var(--tablet-x),
                var(--tablet-y)
              );
            }
          }
        `}</style>

      </div>

      {/* Footer */}
      <p className="mx-auto mt-5 max-w-xl px-2 text-center text-xs font-medium leading-relaxed text-stone-500 sm:mt-8 sm:text-sm">
        One platform. Three roles. Complete support management.
      </p>

    </section>
  );
}
