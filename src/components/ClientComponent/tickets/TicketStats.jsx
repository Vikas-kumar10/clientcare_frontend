
const statItems = [
  { label: "All tickets", value: "All" },
  { label: "Open", value: "Open" },
  { label: "In progress", value: "In Progress" },
  { label: "Resolved", value: "Resolved" },
];

export default function TicketStats({
  tickets,
  status,
  onStatusChange,
}) {
  const getCount = (value) => {
    if (value === "All") return tickets.length;

    if (value === "Resolved") {
      return tickets.filter((ticket) =>
        ["Resolved", "Closed"].includes(ticket.status)
      ).length;
    }

    return tickets.filter((ticket) => ticket.status === value).length;
  };

  return (
    <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {statItems.map((item) => {
        const active = status === item.value;

        return (
          <button
            key={item.label}
            type="button"
            onClick={() => onStatusChange(item.value)}
            aria-pressed={active}
            className={`rounded-2xl border p-4 text-left transition ${
              active
                ? "border-orange-300 bg-orange-50/60"
                : "border-stone-200 bg-white hover:border-stone-300"
            }`}
          >
            <p className="text-xs font-medium text-stone-500">
              {item.label}
            </p>

            <p className="mt-2 text-2xl font-bold text-stone-900">
              {String(getCount(item.value)).padStart(2, "0")}
            </p>
          </button>
        );
      })}
    </div>
  );
}
