
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import {
  PriorityBadge,
  SectionHeading,
  StatusBadge,
} from "../../ClientComponent/UI";

export default function RecentTickets({ tickets = [] }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6 xl:col-span-2">
      <SectionHeading
        title="Recent tickets"
        link="View all tickets"
        to="/admin/tickets"
      />

      <div className="mt-4">
        {tickets.length === 0 ? (
          <p className="py-8 text-center text-sm text-stone-500">
            No tickets available yet.
          </p>
        ) : (
          tickets.slice(0, 5).map((ticket) => {
            const id = ticket._id || ticket.id;
            const projectName =
              ticket.project?.name || ticket.projectName || "Unknown project";
            const clientName =
              ticket.client?.name || ticket.clientName || "Unknown client";

            return (
              <Link
                key={id}
                to={`/admin/tickets/${id}`}
                className="flex flex-col gap-3 border-b border-stone-100 py-4 last:border-0 hover:bg-orange-50/30 sm:flex-row sm:items-center sm:justify-between sm:px-2"
              >
                <div className="min-w-0">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-orange-700">
                      #{String(id).slice(-6).toUpperCase()}
                    </span>

                    <PriorityBadge priority={ticket.priority} />
                  </div>

                  <h3 className="truncate text-sm font-semibold text-stone-900">
                    {ticket.title}
                  </h3>

                  <p className="mt-1 text-xs text-stone-500">
                    {clientName} · {projectName}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <StatusBadge status={ticket.status} />
                  <ArrowUpRight size={16} className="text-stone-400" />
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
