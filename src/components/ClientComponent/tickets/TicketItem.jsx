
import { Link } from "react-router-dom";
import { Ticket } from "lucide-react";
import {
  StatusBadge,
  PriorityBadge,
} from "../../ClientComponent/UI";

export default function TicketItem({ ticket }) {
  const ticketId = ticket._id || ticket.id;

  const projectName =
    ticket.project?.name ||
    ticket.projectName ||
    "Unknown project";

  const developerName =
    ticket.assignedDeveloper?.name ||
    ticket.assignedTo?.name ||
    "";

  const updatedAt = ticket.updatedAt
    ? new Date(ticket.updatedAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Not available";

  return (
    <Link
      to={`/client/tickets/${ticketId}`}
      className="flex flex-col gap-4 p-5 transition hover:bg-orange-50/30 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex min-w-0 items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-700">
          <Ticket size={20} />
        </div>

        <div className="min-w-0">
          <div className="mb-1.5 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-orange-700">
              #{String(ticketId).slice(-6).toUpperCase()}
            </span>

            <PriorityBadge priority={ticket.priority} />
          </div>

          <h3 className="break-words font-semibold text-stone-900">
            {ticket.title}
          </h3>

          <p className="mt-1.5 text-xs text-stone-500">
            {projectName} · Updated {updatedAt}
          </p>

          <p className="mt-2 text-xs text-stone-500">
            {developerName
              ? `Assigned to ${developerName}`
              : "Awaiting developer assignment"}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 pl-14 sm:pl-0">
        <StatusBadge status={ticket.status} />

        <span className="whitespace-nowrap text-xs text-stone-400">
          View details →
        </span>
      </div>
    </Link>
  );
}
