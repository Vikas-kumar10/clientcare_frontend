import { SectionHeading } from "./UI";
import { TicketRow } from "./TicketComponents";

export default function RecentTickets({
  tickets = [],
  loading = false,
  error = "",
  onRetry,
}) {
  const recentTickets = [...tickets]
    .sort(
      (a, b) =>
        new Date(b.updatedAt || b.createdAt).getTime() -
        new Date(a.updatedAt || a.createdAt).getTime(),
    )
    .slice(0, 3);

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
        {loading ? (
          <p className="p-6 text-sm text-stone-500">Loading recent tickets...</p>
        ) : error ? (
          <div role="alert" className="p-6">
            <p className="text-sm text-red-700">{error}</p>
            <button
              type="button"
              onClick={onRetry}
              className="mt-2 text-sm font-semibold text-red-800 underline"
            >
              Try again
            </button>
          </div>
        ) : recentTickets.length > 0 ? (
          recentTickets.map((ticket) => (
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
