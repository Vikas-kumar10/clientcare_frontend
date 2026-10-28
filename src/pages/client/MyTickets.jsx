
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { getTickets } from "../../api/ticketApi";
import { PageHeader } from "../../components/ClientComponent/UI";

import TicketStats from "../../components/ClientComponent/tickets/TicketStats";
import TicketFilters from "../../components/ClientComponent/tickets/TicketFilters";
import TicketList from "../../components/ClientComponent/tickets/TicketList";

export default function MyTickets() {
  const [searchParams] = useSearchParams();
  const projectParam = searchParams.get("project") || "";

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");

  // Fetch tickets from the backend
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getTickets();

        // Support common API response formats
        const ticketList = Array.isArray(response)
          ? response
          : response.tickets || response.data || [];

        // Convert MongoDB fields into the format used by the UI
        const formattedTickets = ticketList.map((ticket) => ({
          ...ticket,
          id: ticket._id || ticket.id,
          projectId:
            ticket.project?._id ||
            ticket.project?.id ||
            ticket.project ||
            "",
          projectName:
            ticket.project?.name ||
            ticket.projectName ||
            "Unknown project",
          assignedDeveloperName:
            ticket.assignedDeveloper?.name || "Not assigned",
        }));

        setTickets(formattedTickets);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load tickets. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  // Search and filter tickets
  const filteredTickets = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return tickets.filter((ticket) => {
      const matchesSearch = [
        ticket.id,
        ticket.title,
        ticket.projectName,
      ].some((value) =>
        String(value || "").toLowerCase().includes(searchText)
      );

      const matchesStatus =
        status === "All" || ticket.status === status;

      const matchesPriority =
        priority === "All" || ticket.priority === priority;

      const matchesProject =
        !projectParam ||
        String(ticket.projectId) === String(projectParam);

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesProject
      );
    });
  }, [tickets, search, status, priority, projectParam]);

  const clearFilters = () => {
    setSearch("");
    setStatus("All");
    setPriority("All");
  };

  return (
    <div>
      <PageHeader
        eyebrow="Support center"
        title="My Tickets"
        description="Review your support requests and follow each issue through to resolution."
        action={
          <Link
            to="/client/create-ticket"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C2410C] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#9A3412] focus:outline-none focus:ring-4 focus:ring-orange-200"
          >
            + New ticket
          </Link>
        }
      />

      {loading ? (
        <div className="rounded-2xl border border-stone-200 bg-white p-8 text-center text-sm text-stone-600">
          Loading your tickets...
        </div>
      ) : error ? (
        <div
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 p-5"
        >
          <p className="text-sm text-red-700">{error}</p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-3 text-sm font-semibold text-red-800 underline"
          >
            Try again
          </button>
        </div>
      ) : (
        <>
          <TicketStats
            tickets={tickets}
            status={status}
            onStatusChange={setStatus}
          />

          <TicketFilters
            search={search}
            setSearch={setSearch}
            status={status}
            setStatus={setStatus}
            priority={priority}
            setPriority={setPriority}
            onReset={clearFilters}
          />

          {filteredTickets.length === 0 ? (
            <div className="mt-5 rounded-2xl border border-stone-200 bg-white px-6 py-10 text-center">
              <h3 className="font-semibold text-stone-800">
                No tickets found
              </h3>
              <p className="mt-2 text-sm text-stone-500">
                Try changing your filters or create a new support ticket.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 text-sm font-semibold text-[#C2410C] hover:text-[#9A3412]"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <TicketList tickets={filteredTickets} />
          )}
        </>
      )}
    </div>
  );
}
