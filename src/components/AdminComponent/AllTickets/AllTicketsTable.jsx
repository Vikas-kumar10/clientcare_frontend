
import { Link } from "react-router-dom";
import { Eye, Ticket } from "lucide-react";

const statusStyles = {
  Open: "bg-amber-50 text-amber-700",
  Assigned: "bg-orange-50 text-orange-700",
  "In Progress": "bg-stone-100 text-stone-700",
  Resolved: "bg-green-50 text-green-700",
  Closed: "bg-red-50 text-red-700",
};

const priorityStyles = {
  Critical: "bg-red-50 text-red-700",
  High: "bg-orange-50 text-orange-700",
  Medium: "bg-amber-50 text-amber-700",
  Low: "bg-stone-100 text-stone-600",
};

function Badge({ value, styles }) {
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${
        styles[value] || "bg-stone-100 text-stone-600"
      }`}
    >
      {value || "Unknown"}
    </span>
  );
}

export default function AllTicketsTable({ tickets = [] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
      <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
        <div>
          <h2 className="font-semibold text-stone-900">All Tickets</h2>
          <p className="mt-1 text-sm text-stone-500">
            Review and manage client issues
          </p>
        </div>

        <span className="rounded-lg bg-orange-50 px-3 py-1.5 text-sm font-semibold text-orange-700">
          {tickets.length} tickets
        </span>
      </div>

      {tickets.length === 0 ? (
        <div className="px-5 py-10 text-center text-sm text-stone-500">
          No tickets to display.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-stone-50 text-xs uppercase tracking-wide text-stone-500">
              <tr>
                <th className="px-5 py-4 font-semibold">Ticket</th>
                <th className="px-5 py-4 font-semibold">Client / Project</th>
                <th className="px-5 py-4 font-semibold">Priority</th>
                <th className="px-5 py-4 font-semibold">Developer</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 text-right font-semibold">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-stone-100">
              {tickets.map((ticket) => {
                const id = ticket._id || ticket.id;

                return (
                  <tr
                    key={id}
                    className="transition hover:bg-orange-50/30"
                  >
                    <td className="px-5 py-4">
                      <p className="max-w-56 truncate text-sm font-semibold text-stone-900">
                        {ticket.title}
                      </p>
                      <p className="mt-1 text-xs text-stone-400">
                        #{String(id).slice(-6).toUpperCase()}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-stone-800">
                        {ticket.client?.name || ticket.clientName || "Unknown client"}
                      </p>
                      <p className="mt-1 text-xs text-stone-500">
                        {ticket.project?.name || ticket.projectName || "Unknown project"}
                      </p>
                      <p className="mt-1 text-xs text-stone-400">
                        {ticket.createdAt
                          ? new Date(ticket.createdAt).toLocaleDateString("en-IN")
                          : "—"}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <Badge
                        value={ticket.priority}
                        styles={priorityStyles}
                      />
                    </td>

                    <td className="px-5 py-4 text-sm text-stone-600">
                      {ticket.assignedDeveloper?.name ||
                        ticket.assignedTo?.name ||
                        "Unassigned"}
                    </td>

                    <td className="px-5 py-4">
                      <Badge
                        value={ticket.status}
                        styles={statusStyles}
                      />
                    </td>

                    <td className="px-5 py-4 text-right">
                      <Link
                        to={`/admin/tickets/${id}`}
                        className="inline-flex items-center gap-2 rounded-lg border border-stone-200 px-3 py-2 text-sm font-medium text-stone-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700"
                      >
                        <Eye size={15} />
                        Review
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
