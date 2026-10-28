
import { Search, Filter, RotateCcw } from "lucide-react";

export default function AllTicketsFilters({
  search,
  setSearch,
  status,
  setStatus,
  priority,
  setPriority,
  onReset,
}) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        <div className="relative md:col-span-2">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
          />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search ticket, client or project..."
            className="w-full rounded-xl border border-stone-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-orange-600 focus:ring-2 focus:ring-orange-100"
          />
        </div>

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="rounded-xl border border-stone-200 bg-white px-3 py-3 text-sm outline-none focus:border-orange-600"
        >
          <option value="All">All statuses</option>
          <option value="Open">Open</option>
          <option value="Assigned">Assigned</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>

        <select
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
          className="rounded-xl border border-stone-200 bg-white px-3 py-3 text-sm outline-none focus:border-orange-600"
        >
          <option value="All">All priorities</option>
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <div className="mt-3 flex justify-end">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-stone-600 transition hover:bg-orange-50 hover:text-orange-700"
        >
          <RotateCcw size={15} />
          Reset filters
        </button>
      </div>
    </div>
  );
}
