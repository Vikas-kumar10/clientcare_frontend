
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

// Responsive orbit radius
const orbitSizes = {
  mobile: { x: 112, y: 145 },
  tablet: { x: 175, y: 190 },
  desktop: { x: 220, y: 220 },
};

export default function RotatingCards() {
  const shouldReduceMotion = useReducedMotion();

  const radius = orbitSizes.desktop;

  return (
    <section className="w-full min-h-screen overflow-hidden bg-[#FAF7F2] flex flex-col items-center justify-center px-4 py-12 sm:px-6">

      {/* Heading */}
      <div className="w-full max-w-4xl text-center mb-8 sm:mb-12">

        <span className="inline-block text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#C2410C]">
          Why ClientCare
        </span>

        <motion.h1
          className="mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#292524] leading-tight"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Complete Support
          <span className="block text-[#C2410C]">
            Management Platform
          </span>
        </motion.h1>

        <p className="mt-3 text-sm sm:text-base text-stone-500 max-w-xl mx-auto">
          Everything your support team needs, connected in one simple platform.
        </p>
      </div>

      {/* Animation Area */}
      <div className="relative w-full max-w-[850px] h-[390px] sm:h-[480px] md:h-[550px] flex items-center justify-center">

        {/* Orbit rotation */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={
            shouldReduceMotion
              ? { rotate: 0 }
              : { rotate: 360 }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : {
                  duration: 35,
                  ease: "linear",
                  repeat: Infinity,
                }
          }
        >

          {/* Orbit Circle */}
          <div className="absolute w-[230px] h-[290px] sm:w-[350px] sm:h-[380px] md:w-[440px] md:h-[440px] rounded-full border border-dashed border-orange-200" />

          {/* Cards */}
          {cards.map((card, index) => {
            const Icon = card.icon;

            const angle = index * 60 - 90;
            const radians = (angle * Math.PI) / 180;

            const positions = {
              mobile: {
                x: Math.cos(radians) * orbitSizes.mobile.x,
                y: Math.sin(radians) * orbitSizes.mobile.y,
              },
              tablet: {
                x: Math.cos(radians) * orbitSizes.tablet.x,
                y: Math.sin(radians) * orbitSizes.tablet.y,
              },
              desktop: {
                x: Math.cos(radians) * radius.x,
                y: Math.sin(radians) * radius.y,
              },
            };

            return (
              <motion.div
                key={card.number}
                className="
                  absolute
                  w-[108px] h-[112px]
                  sm:w-[145px] sm:h-[140px]
                  md:w-[180px] md:h-[165px]
                  rounded-xl sm:rounded-2xl
                  bg-white
                  border border-orange-100
                  shadow-lg
                  p-2 sm:p-3 md:p-5
                  flex flex-col items-center justify-center
                  text-center
                "
                style={{
                  left: "50%",
                  top: "50%",
                  x: "-50%",
                  y: "-50%",
                  marginLeft: positions.desktop.x,
                  marginTop: positions.desktop.y,
                }}
                animate={
                  shouldReduceMotion
                    ? {
                        x: "-50%",
                        y: "-50%",
                      }
                    : undefined
                }
                whileHover={{
                  scale: 1.06,
                  borderColor: "#C2410C",
                }}
              >
                <div className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 rounded-lg bg-orange-50 flex items-center justify-center text-[#C2410C] mb-1.5 sm:mb-2">
                  <Icon size={20} />
                </div>

                <span className="text-[9px] sm:text-[10px] font-bold text-[#C2410C] mb-1">
                  {card.number}
                </span>

                <h3 className="text-[10px] sm:text-xs md:text-sm font-bold text-[#292524] leading-tight">
                  {card.title}
                </h3>

                <p className="hidden md:block text-[10px] text-stone-500 mt-2 leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Fixed Center Logo */}
        <div className="absolute z-20 w-[72px] h-[72px] sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-[#C2410C] shadow-xl shadow-orange-900/20 flex flex-col items-center justify-center border-4 border-[#FAF7F2]">

          <span className="text-white font-bold text-xl sm:text-2xl md:text-3xl">
            CC
          </span>

          <span className="text-orange-100 text-[7px] sm:text-[9px] font-bold tracking-widest">
            CLIENTCARE
          </span>
        </div>
      </div>

      {/* Footer */}
      <p className="mt-5 sm:mt-8 text-xs sm:text-sm text-stone-500 text-center px-2 leading-relaxed">
        One platform. Three roles. Complete support management.
      </p>

    </section>
  );
}
