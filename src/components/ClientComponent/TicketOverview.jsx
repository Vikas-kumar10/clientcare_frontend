import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp } from "lucide-react";
import { SectionHeading, ProgressBar } from "./UI";

export default function TicketOverview({
  tickets,
  inProgressCount,
  resolvedCount,
}) {
  const overview = [
    {
      label: "Open",
      count: tickets.filter((ticket) => ticket.status === "Open").length,
      color: "#C2410C",
    },
    {
      label: "In Progress",
      count: inProgressCount,
      color: "#EA580C",
    },
    {
      label: "Resolved",
      count: resolvedCount,
      color: "#059669",
    },
  ];

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6">
      <SectionHeading title="Ticket overview" />

      <div className="mt-5 space-y-5">
        {overview.map((item) => (
          <div key={item.label}>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-stone-600">{item.label}</span>
              <span className="font-bold text-stone-900">
                {item.count}
              </span>
            </div>

            <ProgressBar
              value={
                tickets.length
                  ? (item.count / tickets.length) * 100
                  : 0
              }
              color={item.color}
            />
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl bg-[#FAF7F2] p-4">
        <div className="flex items-center gap-2 text-orange-800">
          <TrendingUp size={17} />
          <span className="text-sm font-bold">Stay up to date</span>
        </div>

        <p className="mt-2 text-xs leading-5 text-stone-600">
          Open a ticket anytime to review its status and assigned developer.
        </p>

        <Link
          to="/client/tickets"
          className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-orange-800"
        >
          Track tickets <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}