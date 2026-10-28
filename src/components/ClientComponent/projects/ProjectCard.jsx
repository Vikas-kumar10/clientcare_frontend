
import { CalendarDays, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  ProgressBar,
  StatusBadge,
} from "../UI";

export default function ProjectCard({ project, tickets }) {
  const projectTickets = tickets.filter(
    (ticket) => ticket.projectId === project.id
  );

  const openTickets = projectTickets.filter(
    (ticket) => !["Resolved", "Closed"].includes(ticket.status)
  ).length;

  return (
    <article className="overflow-hidden rounded-2xl border border-stone-200 bg-white transition hover:shadow-md">
      <div
        className="h-1.5"
        style={{ backgroundColor: project.color }}
      />

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl text-sm font-bold"
            style={{
              backgroundColor: `${project.color}15`,
              color: project.color,
            }}
          >
            {project.initials}
          </div>

          <StatusBadge status={project.status} />
        </div>

        <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-stone-400">
          {project.id} · {project.category}
        </p>

        <h2 className="mt-1 text-xl font-bold text-stone-900">
          {project.name}
        </h2>

        <p className="mt-2 min-h-12 text-sm leading-6 text-stone-500">
          {project.description}
        </p>

        <div className="mt-5 flex items-center justify-between text-sm">
          <span className="text-stone-500">Completion</span>
          <span className="font-bold text-stone-800">
            {project.progress}%
          </span>
        </div>

        <div className="mt-2">
          <ProgressBar
            value={project.progress}
            color={project.color}
          />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-stone-50 p-3">
            <p className="text-xs text-stone-500">Support tickets</p>
            <p className="mt-1 text-xl font-bold text-stone-900">
              {projectTickets.length}
            </p>
          </div>

          <div className="rounded-xl bg-orange-50 p-3">
            <p className="text-xs text-orange-800">Needs attention</p>
            <p className="mt-1 text-xl font-bold text-orange-900">
              {openTickets}
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 pt-4 text-xs text-stone-500">
          <span className="flex items-center gap-1.5">
            <CalendarDays size={14} />
            Due {project.deliveryDate}
          </span>

          <Link
            to={`/client/tickets?project=${encodeURIComponent(project.id)}`}
            className="inline-flex items-center gap-1 font-semibold text-orange-700 hover:text-orange-900"
          >
            View tickets <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}
