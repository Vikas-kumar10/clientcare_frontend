
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

const clockwiseAnimation = {
  x: [0, 0, 35, 35, 0],
  y: [0, -25, -25, 25, 0],
};

export default function WorkflowSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="overflow-hidden py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#C2410C]">
            How it works
          </p>

          <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
            From issue to resolution
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.article
              key={step.number}
              animate={
                shouldReduceMotion
                  ? { x: 0, y: 0 }
                  : clockwiseAnimation
              }
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.6,
                times: [0, 0.25, 0.5, 0.75, 1],
              }}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : { scale: 1.03 }
              }
              className="relative rounded-3xl border border-stone-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-xl"
            >
              <span className="text-4xl font-extrabold text-orange-200">
                {step.number}
              </span>

              <h3 className="mt-5 text-xl font-bold text-stone-900">
                {step.title}
              </h3>

              <p className="mt-3 leading-7 text-stone-600">
                {step.description}
              </p>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
