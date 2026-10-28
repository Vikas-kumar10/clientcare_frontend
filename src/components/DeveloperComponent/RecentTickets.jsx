import { Link } from "react-router-dom";
import {
  Ticket,
  CalendarDays,
  ArrowRight,
} from "lucide-react";

const statusStyles = {
  Open: "bg-amber-50 text-amber-700",
  "In Progress": "bg-orange-50 text-orange-700",
  Resolved: "bg-emerald-50 text-emerald-700",
  Closed: "bg-stone-100 text-stone-600",
};

const priorityStyles = {
  High: "bg-rose-50 text-rose-700",
  Medium: "bg-amber-50 text-amber-700",
  Low: "bg-stone-100 text-stone-600",
};

function formatDate(date) {
  if (!date) return "—";

  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) return "—";

  return parsedDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function RecentTickets({ tickets = [] }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
      <div className="flex flex-col gap-3 border-b border-stone-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-stone-900">
            Recent assigned tickets
          </h2>
          <p className="mt-1 text-sm text-stone-500">
            Recently created tickets assigned to you.
          </p>
        </div>

        <Link
          to="/developer/tickets"
          className="inline-flex items-center gap-2 text-sm font-semibold text-orange-800 hover:text-orange-950"
        >
          View all tickets <ArrowRight size={16} />
        </Link>
      </div>

      {tickets.length > 0 ? (
        <div className="divide-y divide-stone-100">
          {tickets.map((ticket) => (
            <Link
              key={ticket.id}
              to={`/developer/tickets/${ticket.id}`}
              className="flex flex-col gap-3 p-5 transition hover:bg-orange-50/40 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex min-w-0 items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-stone-100 text-stone-600">
                  <Ticket size={19} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold text-orange-800">
                    {ticket.id}
                  </p>

                  <h3 className="mt-1 truncate text-sm font-bold text-stone-900">
                    {ticket.title}
                  </h3>

                  <p className="mt-1 text-xs text-stone-500">
                    {ticket.projectName} · {ticket.clientName}
                  </p>

                  <p className="mt-2 flex items-center gap-1 text-xs text-stone-400">
                    <CalendarDays size={13} />
                    Created {formatDate(ticket.createdAt)}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pl-[52px] sm:pl-0">
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    priorityStyles[ticket.priority] || priorityStyles.Low
                  }`}
                >
                  {ticket.priority}
                </span>

                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    statusStyles[ticket.status] || statusStyles.Open
                  }`}
                >
                  {ticket.status}
                </span>

                <ArrowRight size={16} className="ml-1 text-stone-400" />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="p-10 text-center">
          <Ticket size={32} className="mx-auto text-stone-300" />
          <h3 className="mt-3 font-bold text-stone-800">
            No assigned tickets
          </h3>
          <p className="mt-1 text-sm text-stone-500">
            Tickets assigned to you will appear here.
          </p>
        </div>
      )}
    </section>
  );
}