import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  UserRound,
  FolderKanban,
  Tag,
  Clock3,
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
  Save,
  Ticket,
} from "lucide-react";

import {
  getDeveloperTicketById,
  updateDeveloperTicket,
} from "../../data/developerData";

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

export default function TicketDetails() {
  const { ticketId } = useParams();

  const [ticket, setTicket] = useState(() =>
    getDeveloperTicketById(ticketId)
  );

  const [status, setStatus] = useState(ticket?.status || "Open");
  const [resolutionNote, setResolutionNote] = useState(
    ticket?.resolutionNote || ""
  );
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const currentTicket = getDeveloperTicketById(ticketId);

    setTicket(currentTicket);
    setStatus(currentTicket?.status || "Open");
    setResolutionNote(currentTicket?.resolutionNote || "");
    setMessage("");
    setError("");
  }, [ticketId]);

  if (!ticket) {
    return (
      <div className="mx-auto max-w-3xl rounded-2xl border border-stone-200 bg-white p-8 text-center">
        <Ticket size={38} className="mx-auto text-stone-300" />

        <h1 className="mt-4 text-xl font-bold text-stone-900">
          Ticket not found
        </h1>

        <p className="mt-2 text-sm text-stone-500">
          This ticket does not exist or is not assigned to this developer.
        </p>

        <Link
          to="/developer/tickets"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#C2410C] px-4 py-3 text-sm font-semibold text-white hover:bg-orange-800"
        >
          <ArrowLeft size={16} />
          Back to assigned tickets
        </Link>
      </div>
    );
  }

  const handleSave = (event) => {
    event.preventDefault();
    setMessage("");
    setError("");

    if (status === "Resolved" && !resolutionNote.trim()) {
      setError("Please enter a resolution note before resolving this ticket.");
      return;
    }

    if (status === "Closed") {
      setError(
        "Developers cannot close tickets in this workflow. Set the ticket to Resolved and let the client or admin confirm closure."
      );
      return;
    }

    const updatedTicket = updateDeveloperTicket(ticket.id, {
      status,
      resolutionNote: resolutionNote.trim(),
      comments: comment.trim()
        ? [
            ...(ticket.comments || []),
            {
              author: ticket.assignedToName,
              message: comment.trim(),
              date: new Date().toISOString().slice(0, 10),
            },
          ]
        : ticket.comments || [],
    });

    if (!updatedTicket) {
      setError("Unable to update this ticket.");
      return;
    }

    setTicket(updatedTicket);
    setStatus(updatedTicket.status);
    setResolutionNote(updatedTicket.resolutionNote || "");
    setComment("");
    setMessage("Ticket updated successfully in this demo.");
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <Link
        to="/developer/tickets"
        className="inline-flex items-center gap-2 text-sm font-semibold text-stone-600 transition hover:text-orange-800"
      >
        <ArrowLeft size={17} />
        Back to assigned tickets
      </Link>

      {/* Ticket heading */}
      <section className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-orange-800">
              {ticket.id}
            </p>

            <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl">
              {ticket.title}
            </h1>

            <p className="mt-3 text-sm leading-6 text-stone-500">
              Review the reported issue, investigate the cause and record the
              resolution.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                priorityStyles[ticket.priority] || priorityStyles.Low
              }`}
            >
              {ticket.priority} priority
            </span>

            <span
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                statusStyles[ticket.status] || statusStyles.Open
              }`}
            >
              {ticket.status}
            </span>
          </div>
        </div>
      </section>

      {message && (
        <div className="flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
          <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
          <p>{message}</p>
        </div>
      )}

      {error && (
        <div className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
          <AlertTriangle size={18} className="mt-0.5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_340px]">
        {/* Main ticket information */}
        <div className="space-y-6">
          <section className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6">
            <h2 className="text-lg font-bold text-stone-900">
              Issue description
            </h2>

            <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-stone-600">
              {ticket.description}
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 border-t border-stone-100 pt-5 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-stone-100 text-stone-600">
                  <FolderKanban size={18} />
                </div>
                <div>
                  <p className="text-xs text-stone-500">Project</p>
                  <p className="mt-1 text-sm font-semibold text-stone-800">
                    {ticket.projectName}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-stone-100 text-stone-600">
                  <Tag size={18} />
                </div>
                <div>
                  <p className="text-xs text-stone-500">Category</p>
                  <p className="mt-1 text-sm font-semibold text-stone-800">
                    {ticket.category}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-stone-100 text-stone-600">
                  <CalendarDays size={18} />
                </div>
                <div>
                  <p className="text-xs text-stone-500">Created date</p>
                  <p className="mt-1 text-sm font-semibold text-stone-800">
                    {ticket.createdAt}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-stone-100 text-stone-600">
                  <Clock3 size={18} />
                </div>
                <div>
                  <p className="text-xs text-stone-500">Current status</p>
                  <p className="mt-1 text-sm font-semibold text-stone-800">
                    {ticket.status}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Client information */}
          <section className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-800">
                <UserRound size={20} />
              </div>
              <div>
                <h2 className="font-bold text-stone-900">Client information</h2>
                <p className="text-xs text-stone-500">
                  Client who reported this issue
                </p>
              </div>
            </div>

            <div className="mt-5">
              <p className="text-sm font-semibold text-stone-900">
                {ticket.clientName}
              </p>
              <p className="mt-1 break-all text-sm text-stone-500">
                {ticket.clientEmail}
              </p>
            </div>
          </section>

          {/* Comments / updates */}
          <section className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <MessageSquare size={20} className="text-orange-800" />
              <div>
                <h2 className="font-bold text-stone-900">Activity and notes</h2>
                <p className="text-xs text-stone-500">
                  Ticket discussion and progress updates
                </p>
              </div>
            </div>

            {ticket.comments?.length ? (
              <div className="mt-5 space-y-4">
                {ticket.comments.map((item, index) => (
                  <div key={`${item.date}-${index}`} className="flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-stone-100 text-xs font-bold text-stone-700">
                      {item.author
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)}
                    </div>

                    <div className="min-w-0 flex-1 rounded-xl bg-stone-50 p-3">
                      <div className="flex flex-wrap justify-between gap-2">
                        <p className="text-sm font-semibold text-stone-800">
                          {item.author}
                        </p>
                        <p className="text-xs text-stone-400">{item.date}</p>
                      </div>
                      <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-stone-600">
                        {item.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-5 rounded-xl bg-stone-50 p-4 text-sm text-stone-500">
                No activity notes yet.
              </p>
            )}
          </section>
        </div>

        {/* Update form */}
        <aside className="lg:sticky lg:top-24">
          <form
            onSubmit={handleSave}
            className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6"
          >
            <h2 className="text-lg font-bold text-stone-900">
              Update ticket
            </h2>
            <p className="mt-1 text-sm leading-5 text-stone-500">
              Update the status and explain the work performed.
            </p>

            <label className="mt-6 block text-sm font-semibold text-stone-700">
              Ticket status
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  setError("");
                  setMessage("");
                }}
                className="mt-2 w-full rounded-xl border border-stone-200 bg-white px-3 py-3 text-sm font-normal outline-none focus:border-orange-500"
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed" disabled>
                  Closed (client/admin confirmation)
                </option>
              </select>
            </label>

            <label className="mt-5 block text-sm font-semibold text-stone-700">
              Resolution note
              <textarea
                rows={5}
                value={resolutionNote}
                onChange={(e) => {
                  setResolutionNote(e.target.value);
                  setError("");
                }}
                placeholder="Explain what you investigated or fixed..."
                className="mt-2 w-full resize-y rounded-xl border border-stone-200 px-3 py-3 text-sm font-normal leading-6 outline-none focus:border-orange-500"
              />
              <span className="mt-1 block text-xs font-normal text-stone-400">
                Required when marking a ticket as Resolved.
              </span>
            </label>

            <label className="mt-5 block text-sm font-semibold text-stone-700">
              Add activity note
              <textarea
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Optional progress update..."
                className="mt-2 w-full resize-y rounded-xl border border-stone-200 px-3 py-3 text-sm font-normal leading-6 outline-none focus:border-orange-500"
              />
            </label>

            {ticket.status === "Resolved" && (
              <div className="mt-4 flex items-start gap-2 rounded-xl bg-emerald-50 p-3 text-xs leading-5 text-emerald-800">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
                This ticket is resolved. The client or admin can confirm
                closure.
              </div>
            )}

            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#C2410C] px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-800"
            >
              <Save size={17} />
              Save changes
            </button>

            <p className="mt-3 text-center text-xs leading-5 text-stone-400">
              Demo changes are saved in this browser only.
            </p>
          </form>
        </aside>
      </div>
    </div>
  );
}