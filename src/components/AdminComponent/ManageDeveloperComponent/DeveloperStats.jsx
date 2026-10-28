import { CheckCircle2, Code2 } from "lucide-react";

function StatCard({ label, value, icon: Icon, tone }) {
  const iconTone = tone === "green"
    ? "bg-emerald-50 text-emerald-700"
    : "bg-orange-50 text-orange-700";

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-stone-500">{label}</p>
        <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconTone}`}>
          <Icon size={20} />
        </span>
      </div>
      <p className="mt-4 text-3xl font-bold text-stone-900">{value}</p>
    </div>
  );
}

export default function DeveloperStats({ total, active }) {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
      <StatCard label="Total developers" value={total} icon={Code2} />
      <StatCard label="Active developers" value={active} icon={CheckCircle2} tone="green" />
    </div>
  );
}
