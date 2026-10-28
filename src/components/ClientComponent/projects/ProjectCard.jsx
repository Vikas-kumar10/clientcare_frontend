import {
  ArrowRight,
  CalendarDays,
  CircleAlert,
  FolderKanban,
  Ticket,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function ProjectCard({ project, tickets = [] }) {
  const projectColor = project.color || "#C2410C";
  const projectId = String(project._id || project.id || "");
  const projectTickets = tickets.filter((ticket) => {
    const ticketProjectId = ticket.projectId || ticket.project?._id || ticket.project;
    return String(ticketProjectId || "") === projectId;
  });
  const openTickets = projectTickets.filter((ticket) =>
    ["Open", "Assigned", "In Progress"].includes(ticket.status),
  ).length;
  const resolvedTickets = projectTickets.filter((ticket) =>
    ["Resolved", "Closed"].includes(ticket.status),
  ).length;
  const resolutionProgress = projectTickets.length
    ? Math.round((resolvedTickets / projectTickets.length) * 100)
    : 0;
  const statusStyle = {
    Active: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    Planning: "bg-sky-50 text-sky-700 ring-sky-200",
    "On Hold": "bg-amber-50 text-amber-700 ring-amber-200",
    Completed: "bg-stone-100 text-stone-700 ring-stone-200",
  }[project.status] || "bg-stone-100 text-stone-700 ring-stone-200";
  const dueDate = project.deliveryDate || project.deadline;
  const initials = project.initials || (project.name || "Project")
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-lg hover:shadow-stone-200/60">
      <div className="h-1" style={{ backgroundColor: projectColor }} />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold ring-1 ring-inset ring-black/5"
              style={{ backgroundColor: `${projectColor}12`, color: projectColor }}
            >
              {initials || <FolderKanban size={20} />}
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-stone-400">
                Project
              </p>
              <p className="mt-1 truncate text-xs font-medium text-stone-500">
                {projectId ? `#${projectId.slice(-6).toUpperCase()}` : "Workspace"}
              </p>
            </div>
          </div>

          <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusStyle}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {project.status || "Planning"}
          </span>
        </div>

        <h2 className="mt-5 line-clamp-2 min-h-14 text-lg font-bold leading-7 text-stone-900">
          {project.name}
        </h2>
        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-stone-500">
          {project.description || "Project details and support activity will appear here."}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-stone-100 bg-stone-50 p-3.5">
            <div className="flex items-center gap-2 text-stone-500">
              <Ticket size={15} />
              <span className="text-xs font-medium">Support tickets</span>
            </div>
            <p className="mt-2 text-2xl font-bold tracking-tight text-stone-900">
              {projectTickets.length}
            </p>
          </div>
          <div className="rounded-xl border border-orange-100 bg-orange-50/70 p-3.5">
            <div className="flex items-center gap-2 text-orange-800">
              <CircleAlert size={15} />
              <span className="text-xs font-medium">Open work</span>
            </div>
            <p className="mt-2 text-2xl font-bold tracking-tight text-orange-900">
              {openTickets}
            </p>
          </div>
        </div>

        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between gap-3 text-xs">
            <span className="font-medium text-stone-500">Ticket resolution</span>
            <span className="font-semibold text-stone-700">
              {projectTickets.length
                ? `${resolvedTickets} of ${projectTickets.length} resolved`
                : "No tickets yet"}
            </span>
          </div>
          <div
            className="h-2 overflow-hidden rounded-full bg-stone-100"
            role="progressbar"
            aria-valuenow={resolutionProgress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${resolutionProgress}% of project tickets resolved`}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${resolutionProgress}%`, backgroundColor: projectColor }}
            />
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-stone-100 pt-5">
          <span className="inline-flex min-w-0 items-center gap-1.5 text-xs text-stone-500">
            <CalendarDays size={14} className="shrink-0" />
            <span className="truncate">
              {dueDate
                ? `Due ${new Date(dueDate).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}`
                : "No due date"}
            </span>
          </span>
          <Link
            to={`/client/tickets?project=${encodeURIComponent(projectId)}`}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-stone-900 px-3.5 py-2.5 text-xs font-semibold text-white transition hover:bg-orange-800 focus:outline-none focus:ring-4 focus:ring-orange-100"
          >
            View tickets <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}
