
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  CalendarDays,
  FolderKanban,
  UserRound,
} from "lucide-react";
import { PriorityBadge, StatusBadge } from "./UI";

export function TicketRow({ ticket }) {
  return (
    <Link
      to={`/client/tickets/${ticket.id}`}
      className="group flex flex-col gap-3 border-b border-stone-100 px-5 py-4 last:border-0 hover:bg-orange-50/40 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex min-w-0 items-start gap-3">
        <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-stone-100 text-stone-600">
          <FolderKanban size={19} />
        </div>
        <div className="min-w-0">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-orange-700">
              {ticket.id}
            </span>
            <PriorityBadge priority={ticket.priority} />
          </div>
          <h3 className="truncate font-semibold text-stone-900 group-hover:text-orange-800">
            {ticket.title}
          </h3>
          <p className="mt-1 text-xs text-stone-500">
            {ticket.projectName} · Updated {ticket.updatedAt}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 pl-[52px] sm:pl-0">
        <StatusBadge status={ticket.status} />
        <ArrowUpRight
          size={17}
          className="text-stone-400 transition group-hover:text-orange-700"
        />
      </div>
    </Link>
  );
}

export function ProjectCard({ project }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-lg hover:shadow-stone-200/40">
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
        {project.category}
      </p>
      <h3 className="mt-1 text-lg font-bold text-stone-900">
        {project.name}
      </h3>
      <p className="mt-2 min-h-12 text-sm leading-6 text-stone-500">
        {project.description}
      </p>

      <div className="mt-5 flex items-center justify-between text-sm">
        <span className="text-stone-500">Project progress</span>
        <span className="font-bold text-stone-800">{project.progress}%</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-stone-100">
        <div
          className="h-full rounded-full"
          style={{
            width: `${project.progress}%`,
            backgroundColor: project.color,
          }}
        />
      </div>

      <div className="mt-5 flex items-center justify-between gap-2 border-t border-stone-100 pt-4 text-xs text-stone-500">
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays size={14} />
          Due {project.deliveryDate}
        </span>
        <Link
          to={`/client/projects?project=${project.id}`}
          className="font-semibold text-orange-700 hover:text-orange-900"
        >
          View project
        </Link>
      </div>
    </div>
  );
}

export function DeveloperCard({ developer }) {
  if (!developer) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-dashed border-stone-300 p-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-stone-100 text-stone-400">
          <UserRound size={20} />
        </div>
        <div>
          <p className="text-sm font-semibold text-stone-800">
            Not assigned yet
          </p>
          <p className="mt-1 text-xs text-stone-500">
            The support team will assign a developer.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-xl border border-stone-200 p-4">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-800">
        {developer.initials}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-stone-900">
          {developer.name}
        </p>
        <p className="mt-1 text-xs text-stone-500">{developer.role}</p>
      </div>
      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" title="Assigned" />
    </div>
  );
}
