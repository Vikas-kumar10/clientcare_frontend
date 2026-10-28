import {
  Ticket,
  CircleAlert,
  Clock3,
  CheckCircle2,
} from "lucide-react";

const statConfig = [
  {
    label: "Total tickets",
    icon: Ticket,
    detail: "Across all your projects",
    color: "bg-orange-50 text-orange-700",
  },
  {
    label: "Awaiting action",
    icon: CircleAlert,
    detail: "Open or awaiting assignment",
    color: "bg-amber-50 text-amber-700",
  },
  {
    label: "In progress",
    icon: Clock3,
    detail: "Currently being investigated",
    color: "bg-stone-100 text-stone-700",
  },
  {
    label: "Resolved",
    icon: CheckCircle2,
    detail: "Resolved or closed",
    color: "bg-emerald-50 text-emerald-700",
  },
];

export default function DashboardStats({ stats }) {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((value, index) => {
        const item = statConfig[index];
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className="rounded-2xl border border-stone-200 bg-white p-5 transition hover:shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-stone-500">
                {item.label}
              </span>

              <span
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.color}`}
              >
                <Icon size={20} />
              </span>
            </div>

            <p className="mt-4 text-3xl font-bold tracking-tight text-stone-900">
              {String(value).padStart(2, "0")}
            </p>

            <p className="mt-2 text-xs text-stone-500">
              {item.detail}
            </p>
          </div>
        );
      })}
    </section>
  );
}