import { memo } from "react";

function SummaryCard({ label, value, description, icon: Icon, color }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-stone-500">{label}</p>
          <p className="mt-3 text-3xl font-extrabold tracking-tight text-stone-900">
            {value}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}
        >
          <Icon size={21} />
        </div>
      </div>

      <p className="mt-3 text-xs text-stone-500">{description}</p>
    </div>
  );
}

export default memo(SummaryCard);