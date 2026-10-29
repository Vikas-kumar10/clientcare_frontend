
import { CheckCircle2, Code2, Headset, Wrench } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const stats = [
  { label: "Open", value: "08", color: "text-orange-700" },
  { label: "Working", value: "04", color: "text-amber-700" },
  { label: "Resolved", value: "24", color: "text-green-700" },
];

const tickets = [
  {
    title: "Checkout page error",
    id: "TKT-101",
    project: "E-commerce website",
    status: "In progress",
    icon: Wrench,
    iconBg: "bg-red-50 text-red-600",
    statusBg: "bg-orange-100 text-orange-800",
  },
  {
    title: "Login page not responding",
    id: "TKT-102",
    project: "Client portal",
    status: "Open",
    icon: Code2,
    iconBg: "bg-amber-50 text-amber-700",
    statusBg: "bg-stone-100 text-stone-600",
  },
];

export default function DashboardPreview() {
  const shouldReduceMotion = useReducedMotion();

  const reveal = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 16,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.45,
        ease: "easeOut",
      },
    },
  };

  const stagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
      },
    },
  };

  const iconMotion = shouldReduceMotion
    ? {}
    : {
        y: [0, -3, 0, 3, 0],
        rotate: [0, 5, 0, -5, 0],
      };

  const textMotion = shouldReduceMotion
    ? {}
    : {
        y: [0, 2, 0, -2, 0],
      };

  const floatTransition = {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  };

  return (
    <div className="relative mx-auto w-full max-w-xl">
      {/* Soft animated background */}
      <motion.div
        aria-hidden="true"
        className="absolute -inset-4 rounded-[2rem] bg-orange-200/30 blur-2xl"
        animate={
          shouldReduceMotion
            ? {}
            : {
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.8, 0.5],
              }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main Dashboard */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={reveal}
        className="relative overflow-hidden rounded-3xl border border-stone-200 bg-white p-4 shadow-2xl shadow-stone-900/10 sm:p-7"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-stone-100 pb-5">
          <div className="flex min-w-0 items-center gap-3">
            {/* Animated Headset Icon */}
            <motion.div
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-orange-100 text-[#C2410C] sm:h-11 sm:w-11"
              animate={iconMotion}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={
                shouldReduceMotion
                  ? {}
                  : { rotate: 12, scale: 1.08 }
              }
            >
              <Headset size={23} />
            </motion.div>

            {/* Header Text */}
            <motion.div
              className="min-w-0"
              animate={textMotion}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <h2 className="text-sm font-bold text-[#292524] sm:text-base">
                Support overview
              </h2>
              <p className="mt-0.5 text-xs text-stone-500 sm:text-sm">
                Your project at a glance
              </p>
            </motion.div>
          </div>

          <motion.span
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-green-50 px-2 py-1 text-[10px] font-semibold text-green-700 sm:px-3 sm:text-xs"
            animate={
              shouldReduceMotion ? {} : { opacity: [1, 0.7, 1] }
            }
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            Live preview
          </motion.span>
        </div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-3 gap-2 py-5 sm:gap-3 sm:py-6"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {stats.map((item, index) => (
            <motion.div
              key={item.label}
              variants={reveal}
              whileHover={
                shouldReduceMotion
                  ? {}
                  : { y: -5, scale: 1.025 }
              }
              transition={{ duration: 0.25 }}
              className="min-w-0 rounded-xl border border-stone-100 bg-[#FAF7F2] p-2.5 sm:rounded-2xl sm:p-4"
            >
              <p className="text-[11px] text-stone-500 sm:text-sm">
                {item.label}
              </p>

              <motion.p
                className={`mt-1.5 text-xl font-extrabold sm:mt-2 sm:text-2xl ${item.color}`}
                initial={{
                  opacity: 0,
                  y: shouldReduceMotion ? 0 : 8,
                }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: shouldReduceMotion ? 0 : 0.2 + index * 0.12,
                  duration: shouldReduceMotion ? 0 : 0.4,
                }}
              >
                {item.value}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>

        {/* Ticket List */}
        <motion.div
          className="space-y-3"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {tickets.map((ticket) => {
            const Icon = ticket.icon;

            return (
              <motion.div
                key={ticket.id}
                variants={reveal}
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        x: 3,
                        borderColor: "#FDBA74",
                        boxShadow: "0 8px 20px rgba(124,45,18,0.06)",
                      }
                }
                transition={{ duration: 0.25 }}
                className="flex min-w-0 items-center gap-2.5 rounded-xl border border-stone-100 p-2.5 sm:gap-3 sm:rounded-2xl sm:p-4"
              >
                {/* Ticket Icon */}
                <motion.div
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl sm:h-10 sm:w-10 ${ticket.iconBg}`}
                  animate={
                    shouldReduceMotion
                      ? {}
                      : {
                          rotate: [0, -6, 0, 6, 0],
                          y: [0, -2, 0, 2, 0],
                        }
                  }
                  transition={{
                    duration: 6,
                    delay: tickets.indexOf(ticket) * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Icon size={19} />
                </motion.div>

                {/* Ticket Text */}
                <motion.div
                  className="min-w-0 flex-1"
                  animate={
                    shouldReduceMotion
                      ? {}
                      : { x: [0, 2, 0, -2, 0] }
                  }
                  transition={{
                    duration: 6,
                    delay: tickets.indexOf(ticket) * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <p className="truncate text-xs font-bold text-[#292524] sm:text-sm">
                    {ticket.title}
                  </p>
                  <p className="mt-1 truncate text-[10px] text-stone-500 sm:text-xs">
                    {ticket.id} · {ticket.project}
                  </p>
                </motion.div>

                {/* Status Badge */}
                <motion.span
                  className={`shrink-0 rounded-full px-2 py-1 text-[9px] font-semibold sm:px-2.5 sm:text-xs ${ticket.statusBg}`}
                  whileHover={
                    shouldReduceMotion ? {} : { scale: 1.05 }
                  }
                >
                  {ticket.status}
                </motion.span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA Banner */}
        <motion.div
          className="relative mt-5 overflow-hidden rounded-2xl bg-[#C2410C] p-3.5 text-white sm:p-4"
          whileHover={
            shouldReduceMotion ? {} : { scale: 1.01 }
          }
          transition={{ duration: 0.25 }}
        >
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -right-6 -top-10 h-24 w-24 rounded-full border border-white/20"
            animate={
              shouldReduceMotion
                ? {}
                : { scale: [1, 1.3, 1], rotate: [0, 45, 0] }
            }
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.p
            className="relative text-xs font-semibold sm:text-sm"
            animate={textMotion}
            transition={floatTransition}
          >
            Every issue has a next step.
          </motion.p>

          <p className="relative mt-1 text-xs text-orange-100 sm:text-sm">
            Report it, assign it, resolve it.
          </p>
        </motion.div>
      </motion.div>

      {/* Floating Resolved Card */}
      <motion.div
        initial={{
          opacity: 0,
          x: shouldReduceMotion ? 0 : -15,
        }}
        animate={{
          opacity: 1,
          x: 0,
          y: shouldReduceMotion ? 0 : [0, -5, 0],
        }}
        transition={{
          opacity: {
            duration: shouldReduceMotion ? 0 : 0.5,
            delay: shouldReduceMotion ? 0 : 0.5,
          },
          x: {
            duration: shouldReduceMotion ? 0 : 0.5,
            delay: shouldReduceMotion ? 0 : 0.5,
          },
          y: {
            duration: 4,
            repeat: shouldReduceMotion ? 0 : Infinity,
            ease: "easeInOut",
          },
        }}
        className="absolute -bottom-5 -left-3 hidden items-center gap-3 rounded-2xl border border-stone-200 bg-white p-3 shadow-lg sm:flex sm:p-4 lg:-left-5"
      >
        {/* Check Icon */}
        <motion.span
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-green-100 text-green-700"
          animate={
            shouldReduceMotion
              ? {}
              : { rotate: [0, -8, 0, 8, 0] }
          }
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <CheckCircle2 size={21} />
        </motion.span>

        {/* Resolved Text */}
        <motion.div
          animate={textMotion}
          transition={floatTransition}
        >
          <p className="text-sm font-bold text-[#292524]">
            Issue resolved
          </p>
          <p className="text-xs text-stone-500">
            Status updated successfully
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
