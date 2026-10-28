
import { Ticket, Search } from "lucide-react";

export default function AllTicketsEmptyState({ isFiltered = false }) {
  const Icon = isFiltered ? Search : Ticket;

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-14 text-center">
      <div className="rounded-2xl bg-orange-50 p-4 text-orange-700">
        <Icon size={28} />
      </div>

      <h3 className="mt-4 text-lg font-semibold text-stone-900">
        {isFiltered ? "No matching tickets" : "No tickets available"}
      </h3>

      <p className="mt-2 max-w-sm text-sm text-stone-500">
        {isFiltered
          ? "Try changing your search or filter options."
          : "Tickets submitted by clients will appear here."}
      </p>
    </div>
  );
}
