
import { Search } from "lucide-react";

export default function ProjectFilters({
  search,
  setSearch,
  filter,
  setFilter,
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row">
      <div className="flex flex-1 items-center gap-2 rounded-xl border border-stone-200 bg-white px-3.5">
        <Search size={18} className="text-stone-400" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search your projects..."
          aria-label="Search projects"
          className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-stone-400"
        />
      </div>

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        aria-label="Filter projects by status"
        className="h-12 rounded-xl border border-stone-200 bg-white px-4 text-sm outline-none focus:border-orange-400"
      >
        <option value="All">All</option>
        <option value="Active">Active</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
}
