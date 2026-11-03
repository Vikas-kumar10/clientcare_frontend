
import { motion, useReducedMotion } from "motion/react";

const steps = [
  {
    number: "01",
    title: "Client reports an issue",
    description: "Submit a ticket with its details, priority, and project.",
  },
  {
    number: "02",
    title: "Admin assigns a developer",
    description: "The support team reviews the issue and assigns ownership.",
  },
  {
    number: "03",
    title: "Developer fixes the issue",
    description: "The developer updates the status and records the solution.",
  },
];

export default function WorkflowSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C2410C] sm:text-sm">
            How it works
          </p>

          <h2 className="mt-3 text-2xl font-extrabold leading-tight text-stone-900 sm:text-3xl md:text-4xl">
            From issue to resolution
          </h2>
        </div>

        {/* Workflow Cards */}
        <div className="mt-10 grid grid-cols-1 items-stretch gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">

          {steps.map((step, index) => (
            <motion.article
              key={step.number}
              animate={
                shouldReduceMotion
                  ? { x: 0, y: 0 }
                  : {
                      x: [0, 0, 18, 18, 0],
                      y: [0, -18, -18, 18, 0],
                    }
              }
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.7,
                times: [0, 0.25, 0.5, 0.75, 1],
              }}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : { scale: 1.02 }
              }
              className="flex h-full min-w-0 flex-col rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-lg sm:rounded-3xl sm:p-7"
            >
              <span className="text-3xl font-extrabold text-orange-200 sm:text-4xl">
                {step.number}
              </span>

              <h3 className="mt-4 break-words text-lg font-bold leading-snug text-stone-900 sm:mt-5 sm:text-xl">
                {step.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-stone-600 sm:mt-3 sm:text-base sm:leading-7">
                {step.description}
              </p>
            </motion.article>
          ))}

        </div>
      </div>
    </section>
  );
}
