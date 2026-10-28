import { CircleAlert, ShieldCheck } from "lucide-react";

const workflowSteps = [
  {
    number: "01",
    title: "Admin review",
    description: "Your issue is reviewed by support.",
  },
  {
    number: "02",
    title: "Developer assigned",
    description: "A suitable developer is selected.",
  },
  {
    number: "03",
    title: "Status updated",
    description: "You can track progress on your dashboard.",
  },
];

export default function TicketSidebar() {
  return (
    <aside className="space-y-4">
      <div className="rounded-2xl bg-[#292524] p-5 text-white">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
          <CircleAlert size={22} />
        </div>

        <h3 className="mt-4 font-bold">Before you submit</h3>

        <ul className="mt-3 space-y-3 text-sm leading-5 text-stone-300">
          <li>• Describe what happened and the expected result.</li>
          <li>• Mention the affected page or feature.</li>
          <li>• Select priority based on the impact.</li>
          <li>• Never include passwords or sensitive payment details.</li>
        </ul>
      </div>

      <div className="rounded-2xl border border-stone-200 bg-white p-5">
        <div className="flex items-center gap-2">
          <ShieldCheck size={19} className="text-emerald-600" />
          <h3 className="font-bold text-stone-900">
            What happens next?
          </h3>
        </div>

        <div className="mt-4 space-y-4">
          {workflowSteps.map((step) => (
            <div key={step.number} className="flex gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-xs font-bold text-orange-800">
                {step.number}
              </span>

              <div>
                <p className="text-sm font-semibold text-stone-800">
                  {step.title}
                </p>
                <p className="mt-1 text-xs leading-5 text-stone-500">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}