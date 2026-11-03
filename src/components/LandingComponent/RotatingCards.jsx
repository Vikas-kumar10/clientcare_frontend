
import { useEffect, useState } from "react";
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

export default function RotatingCards() {
  const shouldReduceMotion = useReducedMotion();

  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Responsive orbit radius
  const radiusX =
    screenWidth < 480
      ? Math.max(85, Math.min(110, (screenWidth - 150) / 2))
      : screenWidth < 768
        ? 145
        : screenWidth < 1024
          ? 185
          : 220;

  const radiusY =
    screenWidth < 480
      ? 125
      : screenWidth < 768
        ? 165
        : screenWidth < 1024
          ? 195
          : 220;

  const cardWidth =
    screenWidth < 480 ? 100 : screenWidth < 768 ? 135 : 175;

  const cardHeight =
    screenWidth < 480 ? 110 : screenWidth < 768 ? 130 : 160;

  const animationSize =
    screenWidth < 480
      ? "h-[340px]"
      : screenWidth < 768
        ? "h-[430px]"
        : screenWidth < 1024
          ? "h-[500px]"
          : "h-[560px]";

  return (
    <section className="w-full overflow-hidden bg-[#FAF7F2] flex flex-col items-center justify-center px-4 py-6 sm:px-6 sm:py-8">

      {/* Heading */}
      <div className="w-full max-w-4xl text-center mb-8 sm:mb-12">

        <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#C2410C]">
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

        
      </div>

      {/* Animation Area */}
      <div
        className={`relative w-full max-w-[850px] ${animationSize} flex items-center justify-center`}
      >

        {/* Orbit Border */}
        <div
          className="absolute rounded-full border border-dashed border-orange-200"
          style={{
            width: radiusX * 2 + 30,
            height: radiusY * 2 + 30,
          }}
        />

        {/* Rotating Cards */}
        <motion.div
          className="absolute inset-0"
          animate={
            shouldReduceMotion
              ? { rotate: 0 }
              : { rotate: 360 }
          }
          transition={{
            duration: shouldReduceMotion ? 0 : 35,
            ease: "linear",
            repeat: shouldReduceMotion ? 0 : Infinity,
          }}
        >
          {cards.map((card, index) => {
            const Icon = card.icon;

            const angle = (index * 360) / cards.length - 90;

            const radians = (angle * Math.PI) / 180;

            const x = Math.cos(radians) * radiusX;
            const y = Math.sin(radians) * radiusY;

            return (
              <motion.div
                key={card.number}
                className="absolute rounded-xl sm:rounded-2xl bg-white border border-orange-100 shadow-lg p-2 sm:p-3 md:p-4 flex flex-col items-center justify-center text-center"
                style={{
                  width: cardWidth,
                  height: cardHeight,
                  left: "50%",
                  top: "50%",
                  marginLeft: x,
                  marginTop: y,
                  translateX: "-50%",
                  translateY: "-50%",
                }}
                whileHover={{
                  scale: 1.06,
                  borderColor: "#C2410C",
                  boxShadow: "0px 15px 35px rgba(194,65,12,0.18)",
                }}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-orange-50 flex items-center justify-center text-[#C2410C] mb-2">
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
        <div className="absolute z-20 w-[68px] h-[68px] sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-[#C2410C] shadow-xl shadow-orange-900/20 flex flex-col items-center justify-center border-4 border-[#FAF7F2]">

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
