import { SectionHeading } from "./UI";
import { TicketRow } from "./TicketComponents";

export default function RecentTickets({ tickets }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white xl:col-span-2">
      <div className="p-5 sm:p-6">
        <SectionHeading
          title="Recent support tickets"
          link="View all"
          to="/client/tickets"
        />

        <p className="mb-4 text-sm text-stone-500">
          Track the latest updates from your support team.
        </p>
      </div>

      <div className="border-t border-stone-100">
        {tickets.length > 0 ? (
          tickets.slice(0, 3).map((ticket) => (
            <TicketRow key={ticket.id} ticket={ticket} />
          ))
        ) : (
          <p className="p-6 text-sm text-stone-500">
            No support tickets found.
          </p>
        )}
      </div>
    </div>
  );
}