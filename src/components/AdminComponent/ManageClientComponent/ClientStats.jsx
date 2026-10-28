
import { Users, UserRound } from "lucide-react";

const statItems = [
  {
    label: "Total clients",
    key: "total",
    icon: Users,
    iconClass: "bg-orange-50 text-orange-700",
  },
  {
    label: "Active clients",
    key: "active",
    icon: UserRound,
    iconClass: "bg-emerald-50 text-emerald-700",
  },
];

export default function ClientStats({ total = 0, active = 0 }) {
  const values = { total, active };

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {statItems.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.key}
            className="rounded-2xl border border-stone-200 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-stone-500">{item.label}</p>
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.iconClass}`}
              >
                <Icon size={20} />
              </span>
            </div>

            <p className="mt-4 text-3xl font-bold text-stone-900">
              {values[item.key]}
            </p>
          </div>
        );
      })}
    </div>
  );
}
