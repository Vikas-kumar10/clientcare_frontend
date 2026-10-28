import { Search } from "lucide-react";

export default function ProjectSearch({
  search,
  onSearchChange,
  resultCount,
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-stone-100 p-4 sm:flex-row sm:items-center sm:p-5">
      <div className="flex h-11 flex-1 items-center gap-2 rounded-xl border border-stone-200 px-3">
        <Search size={17} className="text-stone-400" />

        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search projects..."
          aria-label="Search projects"
          className="w-full bg-transparent text-sm outline-none"
        />
      </div>

      <span className="text-sm text-stone-500">
        {resultCount} projects
      </span>
    </div>
  );
}