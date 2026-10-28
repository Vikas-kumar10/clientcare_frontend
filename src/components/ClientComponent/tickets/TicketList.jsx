
import { EmptyState } from "../../ClientComponent/UI";
import TicketItem from "./TicketItem";

export default function TicketList({ tickets }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
      <div className="flex items-center justify-between gap-3 bg-stone-50/70 px-5 py-3">
        <p className="text-xs text-stone-500">
          Showing{" "}
          <span className="font-bold text-stone-800">
            {tickets.length}
          </span>{" "}
          tickets
        </p>

        <p className="hidden text-xs text-stone-400 sm:block">
          Select a ticket to see details
        </p>
      </div>

      {tickets.length > 0 ? (
        <div className="divide-y divide-stone-100">
          {tickets.map((ticket) => (
            <TicketItem key={ticket.id} ticket={ticket} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No matching tickets"
          description="Try changing the search term or filters to find your tickets."
        />
      )}
    </section>
  );
}
