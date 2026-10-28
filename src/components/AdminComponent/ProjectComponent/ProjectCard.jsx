
import {
  CalendarDays,
  Pencil,
  ArrowUpRight,
  Ticket,
  CircleAlert,
  CheckCircle2,
  FolderKanban,
} from "lucide-react";

import { StatusBadge } from "../../ClientComponent/UI";

export default function ProjectCard({
  project,
  onEdit,
  onView,
}) {
  const projectColor = project.color || "#C2410C";

  const clientName =
    project.client?.name ||
    project.client?.fullName ||
    project.clientName ||
    "Client not assigned";

  const totalTickets = project.totalTickets ?? 0;
  const openIssues = project.openIssues ?? 0;
  const resolvedTickets = project.resolvedTickets ?? 0;

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold"
          style={{
            backgroundColor: `${projectColor}18`,
            color: projectColor,
          }}
        >
          {project.initials || (
            <FolderKanban size={21} />
          )}
        </span>

        <button
          type="button"
          onClick={() => onEdit?.(project)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 px-3 py-2 text-xs font-semibold text-stone-600 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-800"
          aria-label={`Edit ${project.name}`}
        >
          <Pencil size={13} />
          Edit
        </button>
      </div>

      {/* Project information */}
      <div className="mt-4">
        <h3 className="line-clamp-2 text-lg font-bold text-stone-900">
          {project.name}
        </h3>

        <p className="mt-1 text-xs text-stone-500">
          {project.category || "Project"}
        </p>

        <div className="mt-3 flex items-center gap-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-50 text-xs font-bold text-orange-800">
            {clientName !== "Client not assigned"
              ? clientName
                  .split(" ")
                  .filter(Boolean)
                  .slice(0, 2)
                  .map((word) => word[0]?.toUpperCase())
                  .join("")
              : "—"}
          </span>

          <div className="min-w-0">
            <p className="text-[11px] text-stone-400">
              Client
            </p>
            <p className="truncate text-sm font-medium text-stone-700">
              {clientName}
            </p>
          </div>
        </div>

        <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-5 text-stone-500">
          {project.description || "No project description available."}
        </p>
      </div>

      {/* Status */}
      <div className="mt-4 flex items-center justify-between gap-2">
        <StatusBadge status={project.status} />

        {project.deliveryDate && (
          <span className="flex items-center gap-1 text-xs text-stone-500">
            <CalendarDays size={13} />
            {project.deliveryDate}
          </span>
        )}
      </div>

      {/* Ticket summary */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-stone-100 bg-stone-50 p-3">
          <div className="flex items-center gap-1.5 text-stone-500">
            <Ticket size={15} />
            <span className="text-xs">Total tickets</span>
          </div>

          <p className="mt-2 text-2xl font-bold text-stone-900">
            {totalTickets}
          </p>
        </div>

        <div className="rounded-xl border border-orange-100 bg-orange-50/60 p-3">
          <div className="flex items-center gap-1.5 text-orange-800">
            <CircleAlert size={15} />
            <span className="text-xs">Open issues</span>
          </div>

          <p className="mt-2 text-2xl font-bold text-orange-800">
            {openIssues}
          </p>
        </div>
      </div>

      {resolvedTickets > 0 && (
        <div className="mt-3 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm font-semibold text-emerald-800">
          <CheckCircle2 size={17} aria-hidden="true" />
          <span>
            {resolvedTickets} resolved {resolvedTickets === 1 ? "ticket" : "tickets"}
          </span>
        </div>
      )}

      {/* Optional progress */}
      {project.progress > 0 && (
        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="text-stone-500">Progress</span>
            <span className="font-semibold text-stone-700">
              {Math.min(100, project.progress)}%
            </span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-stone-100">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${Math.min(100, Math.max(0, project.progress))}%`,
                backgroundColor: projectColor,
              }}
            />
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="mt-auto border-t border-stone-100 pt-4">
        <button
          type="button"
          onClick={() => onView?.(project)}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#C2410C] px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-800 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2"
        >
          View Project
          <ArrowUpRight size={16} />
        </button>
      </div>
    </article>
  );
}
