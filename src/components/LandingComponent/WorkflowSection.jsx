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
  return (
    <section className="py-20 sm:py-24">
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
          {steps.map((step) => (
            <article
              key={step.number}
              className="rounded-3xl border border-stone-200 bg-white p-7"
            >
              <span className="text-4xl font-extrabold text-orange-200">
                {step.number}
              </span>
              <h3 className="mt-5 text-xl font-bold">{step.title}</h3>
              <p className="mt-3 leading-7 text-stone-600">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}