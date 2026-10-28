
import { Search, SlidersHorizontal, X } from "lucide-react";

const inputClass =
  "max-w-32 bg-transparent text-sm font-medium outline-none";

export default function TicketFilters({
  search,
  setSearch,
  status,
  setStatus,
  priority,
  setPriority,
  onReset,
}) {
  return (
    <section className="mb-6 overflow-hidden rounded-2xl border border-stone-200 bg-white">
      <div className="border-b border-stone-100 p-4 sm:p-5">
        <div className="flex flex-col gap-3 xl:flex-row">
          {/* Search */}
          <div className="flex h-11 flex-1 items-center gap-2 rounded-xl border border-stone-200 px-3">
            <Search size={17} className="shrink-0 text-stone-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by ticket ID, title or project..."
              aria-label="Search tickets"
              className="w-full bg-transparent text-sm outline-none placeholder:text-stone-400"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <X size={16} className="text-stone-400" />
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <label className="flex h-11 items-center gap-2 rounded-xl border border-stone-200 px-3">
              <SlidersHorizontal size={15} className="text-stone-400" />

              <span className="text-xs text-stone-500">Status</span>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className={inputClass}
              >
                <option value="All">All</option>
                <option value="Open">Open</option>
                <option value="Assigned">Assigned</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </select>
            </label>

            <label className="flex h-11 items-center gap-2 rounded-xl border border-stone-200 px-3">
              <span className="text-xs text-stone-500">Priority</span>

              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="max-w-28 bg-transparent text-sm font-medium outline-none"
              >
                <option value="All">All</option>
                <option value="Urgent">Urgent</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </label>

            <button
              type="button"
              onClick={onReset}
              className="h-11 rounded-xl px-3 text-sm font-semibold text-orange-700 transition hover:bg-orange-50"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
