
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
  { x: -105, y: -125 },
  { x: 0, y: -220 },
  { x: 105, y: -125 },
  { x: 105, y: 125 },
  { x: 0, y: 220 },
  { x: -105, y: 125 },
];

export default function RotatingCards() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="min-h-[100svh] overflow-hidden bg-[#FAF7F2] flex flex-col items-center justify-center px-3 py-8 sm:px-5 sm:py-10">

      {/* Heading */}
      <div className="w-full max-w-[760px] text-left mb-5 sm:mb-8">
        <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#C2410C]">
          Why ClientCare
        </span>

        <motion.h1
          className="mt-2 whitespace-nowrap text-[clamp(1rem,5vw,3rem)] font-bold tracking-tight text-[#292524]"
          initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Complete Support <span className="text-[#C2410C]">Management Platform</span>
        </motion.h1>
      </div>

      {/* Animation Area */}
      <div className="relative w-full max-w-[760px] h-[470px] sm:h-[540px] md:h-[570px] flex items-center justify-center">

        {/* Center Circle */}
        <div className="absolute z-20 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-[#C2410C] shadow-xl shadow-orange-900/20 flex flex-col items-center justify-center">
          <span className="text-white font-bold text-xl md:text-2xl">
            CC
          </span>

          <span className="text-orange-100 text-[8px] md:text-[9px] font-semibold tracking-widest">
            CLIENTCARE
          </span>
        </div>

        {/* Cards */}
        {cards.map((card, index) => {
          const Icon = card.icon;

          const position = {
            x: desktopPositions[index].x,
            y: desktopPositions[index].y,
          };

          const tablet = tabletPositions[index];
          const mobile = mobilePositions[index];

          return (
            <motion.div
              key={card.number}
              className="absolute z-10 w-[105px] h-[120px] sm:w-[150px] sm:h-[145px] md:w-[185px] md:h-[165px] rounded-xl sm:rounded-2xl bg-white border border-orange-100 shadow-lg p-2 sm:p-4 md:p-5 flex flex-col justify-center items-center text-center"
              initial={
                shouldReduceMotion
                  ? {
                      x: position.x,
                      y: position.y,
                      opacity: 1,
                      scale: 1,
                    }
                  : {
                      x: -300,
                      y: 250,
                      opacity: 0,
                      scale: 0.5,
                    }
              }
              animate={{
                x: [
                  -300,
                  -260,
                  -180,
                  -100,
                  0,
                  position.x,
                ],
                y: [
                  250,
                  100,
                  -100,
                  -220,
                  -100,
                  position.y,
                ],
                opacity: 1,
                scale: 1,
              }}
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
                "--desktop-x": `${position.x}px`,
                "--desktop-y": `${position.y}px`,
                "--tablet-x": `${tablet.x}px`,
                "--tablet-y": `${tablet.y}px`,
                "--mobile-x": `${mobile.x}px`,
                "--mobile-y": `${mobile.y}px`,
              }}
            >
              {/* Icon */}
              <div className="w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-orange-50 flex items-center justify-center text-[#C2410C] mb-1.5 sm:mb-2">
                <Icon size={20} className="sm:w-6 sm:h-6" />
              </div>

              {/* Number */}
              <span className="text-[9px] sm:text-[10px] font-bold text-[#C2410C] mb-1">
                {card.number}
              </span>

              {/* Title */}
              <h3 className="text-[10px] sm:text-xs md:text-sm font-bold text-[#292524] leading-tight">
                {card.title}
              </h3>

              {/* Description */}
              <p className="hidden md:block text-[10px] text-stone-500 mt-2 leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <p className="mt-2 text-[10px] sm:text-xs text-stone-500 text-center">
        One platform. Three roles. Complete support management.
      </p>
    </section>
  );
}
