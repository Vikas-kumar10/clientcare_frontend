import { Link } from "react-router-dom";
import { AlertTriangle, ArrowRight } from "lucide-react";

export default function HighPriorityAlert({ count }) {
  if (count === 0) return null;

  return (
    <section className="flex flex-col gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-rose-700">
          <AlertTriangle size={20} />
        </div>

        <div>
          <h3 className="font-bold text-rose-900">
            High-priority tickets need attention
          </h3>

          <p className="mt-1 text-sm text-rose-800">
            You have {count} unresolved high-priority{" "}
            {count === 1 ? "ticket" : "tickets"}.
          </p>
        </div>
      </div>

      <Link
        to="/developer/tickets?priority=High"
        className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-rose-800 hover:text-rose-950"
      >
        Review tickets <ArrowRight size={16} />
      </Link>
    </section>
  );
}