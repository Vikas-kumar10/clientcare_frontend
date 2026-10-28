import { Search } from "lucide-react";

export default function DeveloperFilters({ search, setSearch, statusFilter, setStatusFilter }) {
  return (
    <div className="flex flex-col gap-3 border-b border-stone-100 p-4 sm:flex-row sm:p-5">
      <div className="flex h-11 flex-1 items-center gap-2 rounded-xl border border-stone-200 px-3">
        <Search size={17} className="text-stone-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search developer by name, email or team..." className="w-full bg-transparent text-sm outline-none" />
      </div>
      <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} aria-label="Filter developers by status" className="h-11 rounded-xl border border-stone-200 bg-white px-3 text-sm">
        <option>All</option>
        <option>Active</option>
        <option>Suspended</option>
      </select>
    </div>
  );
}
