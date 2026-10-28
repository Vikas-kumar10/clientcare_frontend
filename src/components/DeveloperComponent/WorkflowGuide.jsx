const steps = [
  {
    number: "01",
    title: "Review",
    text: "Read the client issue and understand the problem.",
  },
  {
    number: "02",
    title: "Resolve",
    text: "Investigate the issue and work on a suitable fix.",
  },
  {
    number: "03",
    title: "Update",
    text: "Change the status and add a resolution note.",
  },
];

export default function WorkflowGuide() {
  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6">
      <h2 className="text-base font-bold text-stone-900">Your workflow</h2>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {steps.map((step) => (
          <div key={step.number} className="flex gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-sm font-extrabold text-orange-800">
              {step.number}
            </div>

            <div>
              <h3 className="text-sm font-bold text-stone-900">
                {step.title}
              </h3>
              <p className="mt-1 text-sm leading-5 text-stone-500">
                {step.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}