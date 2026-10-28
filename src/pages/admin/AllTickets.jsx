
import { useCallback, useEffect, useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { getTickets } from "../../api/ticketApi";
import { PageHeader } from "../../components/ClientComponent/UI";

import AllTicketsStats from "../../components/AdminComponent/AllTickets/AllTicketsStats";
import AllTicketsFilters from "../../components/AdminComponent/AllTickets/AllTicketsFilters";
import AllTicketsTable from "../../components/AdminComponent/AllTickets/AllTicketsTable";
import AllTicketsEmptyState from "../../components/AdminComponent/AllTickets/AllTicketsEmptyState";

function normalizeTickets(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.tickets)) return response.tickets;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.data?.tickets)) return response.data.tickets;
  return [];
}

export default function AllTickets() {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTickets = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getTickets();
      setTickets(normalizeTickets(response));
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to load tickets. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const filteredTickets = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tickets.filter((ticket) => {
      const id = String(ticket._id || ticket.id || "");
      const title = ticket.title || "";
      const client = ticket.client?.name || ticket.clientName || "";
      const project = ticket.project?.name || ticket.projectName || "";
      const developer =
        ticket.assignedDeveloper?.name || ticket.assignedTo?.name || "";

      const matchesSearch =
        !query ||
        [id, title, client, project, developer].some((value) =>
          String(value).toLowerCase().includes(query)
        );

      const matchesStatus =
        status === "All" || ticket.status === status;

      const matchesPriority =
        priority === "All" || ticket.priority === priority;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tickets, search, status, priority]);

  const resetFilters = () => {
    setSearch("");
    setStatus("All");
    setPriority("All");
  };

  const hasActiveFilters =
    search.trim() !== "" || status !== "All" || priority !== "All";

  return (
    <div className="space-y-6">
      <PageHeader
        title="All Tickets"
        description="View, search and manage support tickets submitted by clients."
      />

      {loading ? (
        <div className="rounded-2xl border border-stone-200 bg-white py-16 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-orange-100 border-t-orange-700" />
          <p className="mt-4 text-sm text-stone-500">Loading tickets...</p>
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 bg-white p-6">
          <p className="text-sm text-red-700">{error}</p>
          <button
            type="button"
            onClick={fetchTickets}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-orange-700 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-800"
          >
            <RotateCcw size={15} />
            Try again
          </button>
        </div>
      ) : (
        <>
          <AllTicketsStats tickets={tickets} />

          <AllTicketsFilters
            search={search}
            setSearch={setSearch}
            status={status}
            setStatus={setStatus}
            priority={priority}
            setPriority={setPriority}
            onReset={resetFilters}
          />

          {filteredTickets.length > 0 ? (
            <AllTicketsTable tickets={filteredTickets} />
          ) : (
            <AllTicketsEmptyState isFiltered={hasActiveFilters} />
          )}
        </>
      )}
    </div>
  );
}
