
const statusConfig = [
  { label: "Open", color: "bg-orange-600" },
  { label: "Assigned", color: "bg-amber-500" },
  { label: "In Progress", color: "bg-stone-600" },
  { label: "Resolved", color: "bg-emerald-600" },
  { label: "Closed", color: "bg-stone-300" },
];

export default function TicketStatusOverview({ tickets = [] }) {
  const total = tickets.length;

  const breakdown = statusConfig.map((item) => ({
    ...item,
    count: tickets.filter((ticket) => ticket.status === item.label).length,
  }));

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6">
      <h2 className="font-bold text-stone-900">
        Ticket status overview
      </h2>

      <p className="mt-1 text-sm text-stone-500">
        Distribution across all tickets.
      </p>

      <div className="mt-6 flex h-3 overflow-hidden rounded-full bg-stone-100">
        {breakdown.map((item) => (
          <div
            key={item.label}
            className={item.color}
            style={{
              width: `${total ? (item.count / total) * 100 : 0}%`,
            }}
            title={`${item.label}: ${item.count}`}
          />
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {breakdown.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-2.5">
              <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
              <span className="text-sm text-stone-600">
                {item.label}
              </span>
            </div>

            <span className="text-sm font-bold text-stone-900">
              {item.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
