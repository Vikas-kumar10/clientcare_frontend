import { CheckCircle2, Code2, Headset, Wrench } from "lucide-react";

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
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="absolute -inset-4 rounded-[2rem] bg-orange-200/30 blur-2xl" />

      <div className="relative overflow-hidden rounded-3xl border border-stone-200 bg-white p-5 shadow-2xl shadow-stone-900/10 sm:p-7">
        <div className="flex items-center justify-between border-b border-stone-100 pb-5">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-orange-100 text-[#C2410C]">
              <Headset size={23} />
            </div>

            <div>
              <h2 className="font-bold">Support overview</h2>
              <p className="text-sm text-stone-500">
                Your project at a glance
              </p>
            </div>
          </div>

          <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
            Live preview
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3 py-6">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl bg-[#FAF7F2] p-3 sm:p-4"
            >
              <p className="text-xs text-stone-500 sm:text-sm">
                {item.label}
              </p>
              <p className={`mt-2 text-2xl font-extrabold ${item.color}`}>
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {tickets.map((ticket) => {
            const Icon = ticket.icon;

            return (
              <div
                key={ticket.id}
                className="flex items-center gap-3 rounded-2xl border border-stone-100 p-4"
              >
                <div
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${ticket.iconBg}`}
                >
                  <Icon size={20} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">{ticket.title}</p>
                  <p className="mt-1 text-xs text-stone-500">
                    {ticket.id} · {ticket.project}
                  </p>
                </div>

                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${ticket.statusBg}`}
                >
                  {ticket.status}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-5 rounded-2xl bg-[#C2410C] p-4 text-white">
          <p className="text-sm font-semibold">
            Every issue has a next step.
          </p>
          <p className="mt-1 text-sm text-orange-100">
            Report it, assign it, resolve it.
          </p>
        </div>
      </div>

      <div className="absolute -bottom-5 -left-4 hidden items-center gap-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-lg sm:flex">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-green-100 text-green-700">
          <CheckCircle2 size={21} />
        </span>
        <div>
          <p className="text-sm font-bold">Issue resolved</p>
          <p className="text-xs text-stone-500">
            Status updated successfully
          </p>
        </div>
      </div>
    </div>
  );
}