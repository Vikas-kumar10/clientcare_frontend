import { Link } from "react-router-dom";
import { ArrowRight, Inbox } from "lucide-react";

const statusStyles = {
  Open: "bg-orange-50 text-orange-700 ring-orange-200",
  Assigned: "bg-amber-50 text-amber-700 ring-amber-200",
  "In Progress": "bg-orange-100 text-orange-800 ring-orange-200",
  Resolved: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Closed: "bg-stone-100 text-stone-600 ring-stone-200",
};

const priorityStyles = {
  Urgent: "bg-rose-50 text-rose-700 ring-rose-200",
  High: "bg-orange-50 text-orange-700 ring-orange-200",
  Medium: "bg-amber-50 text-amber-700 ring-amber-200",
  Low: "bg-stone-100 text-stone-600 ring-stone-200",
};

export function PageHeader({ eyebrow, title, description, action }) {
  return (
    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && (
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-orange-700">
            {eyebrow}
          </p>
        )}
        <h1 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-500">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

export function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex whitespace-nowrap items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
        statusStyles[status] || statusStyles.Open
      }`}
    >
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

export function PriorityBadge({ priority }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
        priorityStyles[priority] || priorityStyles.Medium
      }`}
    >
      {priority}
    </span>
  );
}

export function ProgressBar({ value, color = "#C2410C" }) {
  return (
    <div
      className="h-2 overflow-hidden rounded-full bg-stone-100"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${value}% complete`}
    >
      <div
        className="h-full rounded-full transition-all"
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </div>
  );
}

export function EmptyState({
  title = "Nothing here yet",
  description = "Try changing your filters or check back later.",
}) {
  return (
    <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-700">
        <Inbox size={26} />
      </div>
      <h3 className="font-semibold text-stone-900">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-stone-500">{description}</p>
    </div>
  );
}

export function SectionHeading({ title, link, to = "/client/tickets" }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="font-bold text-stone-900">{title}</h2>
      {link && (
        <Link
          to={to}
          className="inline-flex items-center gap-1 text-sm font-semibold text-orange-700 hover:text-orange-800"
        >
          {link}
          <ArrowRight size={15} />
        </Link>
      )}
    </div>
  );
}
