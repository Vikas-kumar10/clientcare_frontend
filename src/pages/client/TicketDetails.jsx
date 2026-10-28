
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  CircleAlert,
  Clock3,
  FileText,
  FolderKanban,
  MessageSquare,
  ShieldCheck,
  Ticket as TicketIcon,
  UserRound,
} from "lucide-react";
import { getTicketById } from "../../api/ticketApi";
import { getTicketActivities } from "../../api/activityApi";
import {
  PageHeader,
  PriorityBadge,
  StatusBadge,
} from "../../components/ClientComponent/UI";
import { DeveloperCard } from "../../components/ClientComponent/TicketComponents";

export default function TicketDetails() {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTicket = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getTicketById(ticketId);
      const source = response?.ticket;
      if (!source) throw new Error("Ticket details were not returned by the server.");

      let activities = [];
      try {
        const activityResponse = await getTicketActivities(ticketId);
        activities = activityResponse.activities || [];
      } catch {
        // Ticket details remain available even when the activity log is empty/unavailable.
      }

      const timeline = [
        {
          title: "Ticket created",
          date: source.createdAt,
          description: "Your support request was submitted.",
          completed: true,
        },
        ...activities.map((item) => ({
          title: item.action || "Ticket update",
          date: item.createdAt,
          description: item.description,
          completed: true,
        })),
      ];

      if (source.status !== "Open" && source.status !== "Assigned") {
        timeline.push({
          title: `Status: ${source.status}`,
          date: source.resolvedAt || source.updatedAt,
          description: source.resolution || "The support team updated this ticket.",
          completed: true,
        });
      }

      timeline.sort((a, b) => new Date(a.date || 0) - new Date(b.date || 0));

      const assignedDeveloper = source.assignedDeveloper;
      setTicket({
        ...source,
        id: String(source._id || source.id),
        projectId: source.project?._id || source.project?.id || source.project || "",
        projectName: source.project?.name || source.projectName || "Unknown project",
        category: source.category || "Support request",
        createdAt: source.createdAt
          ? new Date(source.createdAt).toLocaleDateString("en-IN")
          : "Date unavailable",
        updatedAt: source.updatedAt
          ? new Date(source.updatedAt).toLocaleDateString("en-IN")
          : "Date unavailable",
        assignedTo: assignedDeveloper
          ? {
              ...assignedDeveloper,
              id: assignedDeveloper._id || assignedDeveloper.id,
              role: "Developer",
              initials: (assignedDeveloper.name || "Developer")
                .split(/\s+/)
                .filter(Boolean)
                .map((part) => part[0]?.toUpperCase())
                .join("")
                .slice(0, 2),
            }
          : null,
        timeline,
      });
    } catch (err) {
      setTicket(null);
      setError(
        err.response?.data?.message || err.message || "Unable to load this ticket."
      );
    } finally {
      setLoading(false);
    }
  }, [ticketId]);

  useEffect(() => {
    fetchTicket();
  }, [fetchTicket]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-stone-200 bg-white p-8 text-center text-sm text-stone-500">
        Loading ticket details...
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-stone-200 bg-white p-8 text-center">
        <CircleAlert size={36} className="mx-auto text-orange-700" />
        <h1 className="mt-4 text-xl font-bold text-stone-900">
          Ticket not found
        </h1>
        <p className="mt-2 text-sm text-stone-500">
          {error || "This ticket could not be found or you do not have access."}
        </p>
        <Link
          to="/client/tickets"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#C2410C] px-4 py-3 text-sm font-semibold text-white"
        >
          <ArrowLeft size={16} /> Back to tickets
        </Link>
        <button
          type="button"
          onClick={fetchTicket}
          className="mt-4 block w-full text-sm font-semibold text-orange-800 underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div>
      <Link
        to="/client/tickets"
        className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-stone-500 transition hover:text-orange-800"
      >
        <ArrowLeft size={16} /> Back to my tickets
      </Link>

      <PageHeader
        eyebrow={`Support ticket · ${ticket.id}`}
        title={ticket.title}
        description="Review the issue, current status and the latest support progress."
        action={<StatusBadge status={ticket.status} />}
      />

      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
            <div className="flex flex-wrap items-center gap-3 border-b border-stone-100 p-5 sm:p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-700">
                <FileText size={21} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-stone-400">Ticket ID</p>
                <p className="mt-1 font-bold text-stone-900">{ticket.id}</p>
              </div>
              <PriorityBadge priority={ticket.priority} />
            </div>

            <div className="p-5 sm:p-6">
              <h2 className="font-bold text-stone-900">Issue description</h2>
              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-stone-600">
                {ticket.description}
              </p>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-stone-50 p-4">
                  <p className="flex items-center gap-2 text-xs text-stone-500">
                    <FolderKanban size={15} /> Related project
                  </p>
                  <p className="mt-2 text-sm font-semibold text-stone-900">
                    {ticket.projectName}
                  </p>
                  <p className="mt-1 text-xs text-stone-400">{ticket.projectId}</p>
                </div>
                <div className="rounded-xl bg-stone-50 p-4">
                  <p className="flex items-center gap-2 text-xs text-stone-500">
                    <CalendarDays size={15} /> Date reported
                  </p>
                  <p className="mt-2 text-sm font-semibold text-stone-900">
                    {ticket.createdAt}
                  </p>
                  <p className="mt-1 text-xs text-stone-400">
                    Last updated {ticket.updatedAt}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-700">
                <Clock3 size={20} />
              </div>
              <div>
                <h2 className="font-bold text-stone-900">Ticket timeline</h2>
                <p className="mt-1 text-xs text-stone-500">
                  Follow the progress of your support request.
                </p>
              </div>
            </div>

            <div className="mt-7">
              {ticket.timeline.map((item, index) => {
                const last = index === ticket.timeline.length - 1;
                return (
                  <div key={`${item.title}-${index}`} className="relative flex gap-4 pb-7 last:pb-0">
                    {!last && (
                      <div
                        className={`absolute left-[15px] top-8 h-[calc(100%-16px)] w-px ${
                          item.completed ? "bg-emerald-200" : "bg-stone-200"
                        }`}
                      />
                    )}
                    <div
                      className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                        item.completed
                          ? "bg-emerald-100 text-emerald-700"
                          : "border border-stone-200 bg-white text-stone-400"
                      }`}
                    >
                      {item.completed ? (
                        <CheckCircle2 size={17} />
                      ) : (
                        <Clock3 size={16} />
                      )}
                    </div>
                    <div className="min-w-0 flex-1 pt-0.5">
                      <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-start">
                        <h3 className="text-sm font-semibold text-stone-900">
                          {item.title}
                        </h3>
                        <span className="text-xs text-stone-400">{item.date}</span>
                      </div>
                      <p className="mt-1.5 text-sm leading-6 text-stone-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <h2 className="font-bold text-stone-900">Resolution details</h2>
                <p className="mt-1 text-xs text-stone-500">
                  Information recorded when the issue is resolved.
                </p>
              </div>
            </div>

            {ticket.resolution ? (
              <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50/70 p-4">
                <p className="text-sm leading-6 text-emerald-900">
                  {ticket.resolution}
                </p>
              </div>
            ) : (
              <div className="mt-5 rounded-xl border border-dashed border-stone-300 bg-stone-50 p-5">
                <p className="text-sm font-semibold text-stone-700">
                  No resolution recorded yet
                </p>
                <p className="mt-1 text-sm leading-6 text-stone-500">
                  The support team will provide resolution details once the issue is fixed.
                </p>
              </div>
            )}
          </section>
        </div>

        <aside className="space-y-5">
          <section className="rounded-2xl border border-stone-200 bg-white p-5">
            <h2 className="font-bold text-stone-900">Assigned developer</h2>
            <p className="mt-1 text-xs text-stone-500">
              Person handling your issue.
            </p>
            <div className="mt-4">
              <DeveloperCard developer={ticket.assignedTo} />
            </div>
          </section>

          <section className="rounded-2xl border border-stone-200 bg-white p-5">
            <h2 className="font-bold text-stone-900">Ticket information</h2>
            <div className="mt-4 space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-stone-400">
                  <TicketIcon size={17} />
                </div>
                <div>
                  <p className="text-xs text-stone-500">Status</p>
                  <div className="mt-1.5"><StatusBadge status={ticket.status} /></div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-stone-400">
                  <CircleAlert size={17} />
                </div>
                <div>
                  <p className="text-xs text-stone-500">Priority</p>
                  <div className="mt-1.5"><PriorityBadge priority={ticket.priority} /></div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-stone-400">
                  <MessageSquare size={17} />
                </div>
                <div>
                  <p className="text-xs text-stone-500">Category</p>
                  <p className="mt-1 text-sm font-semibold text-stone-800">
                    {ticket.category}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-[#292524] p-5 text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
              <ShieldCheck size={21} />
            </div>
            <h2 className="mt-4 font-bold">Need more help?</h2>
            <p className="mt-2 text-sm leading-6 text-stone-300">
              If you are facing another issue, create a separate support ticket.
            </p>
            <Link
              to="/client/create-ticket"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-stone-900 transition hover:bg-orange-50"
            >
              Create new ticket
            </Link>
          </section>
        </aside>
      </div>
    </div>
  );
}
