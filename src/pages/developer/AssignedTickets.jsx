import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Search,
  Ticket,
  ArrowRight,
  CalendarDays,
  SlidersHorizontal,
  X,
} from "lucide-react";

import { getTickets } from "../../api/ticketApi";

const statusStyles = {
  Open: "bg-amber-50 text-amber-700",
  Assigned: "bg-sky-50 text-sky-700",
  "In Progress": "bg-orange-50 text-orange-700",
  Resolved: "bg-emerald-50 text-emerald-700",
  Closed: "bg-stone-100 text-stone-600",
};

const priorityStyles = {
  High: "bg-rose-50 text-rose-700",
  Critical: "bg-red-100 text-red-800",
  Medium: "bg-amber-50 text-amber-700",
  Low: "bg-stone-100 text-stone-600",
};

export default function AssignedTickets() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState(
    searchParams.get("priority") || "All"
  );

  const fetchTickets = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getTickets();
      const ticketList = Array.isArray(response?.tickets)
        ? response.tickets
        : Array.isArray(response)
          ? response
          : [];

      setTickets(ticketList.map((ticket) => ({
        ...ticket,
        id: ticket._id || ticket.id,
        projectName: ticket.project?.name || ticket.projectName || "Unknown project",
        clientName: ticket.client?.name || ticket.clientName || "Unknown client",
      })));
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load assigned tickets.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const searchText =
        `${ticket.id} ${ticket.title} ${ticket.projectName} ${ticket.clientName}`.toLowerCase();

      return (
        searchText.includes(search.toLowerCase()) &&
        (statusFilter === "All" || ticket.status === statusFilter) &&
        (priorityFilter === "All" || ticket.priority === priorityFilter)
      );
    });
  }, [tickets, search, statusFilter, priorityFilter]);

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setPriorityFilter("All");
    setSearchParams({});
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-800">
            Developer workspace
          </p>

          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl">
            Assigned Tickets
          </h1>

          <p className="mt-2 text-sm leading-6 text-stone-500">
            Review and manage only the support issues assigned to you.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchTickets}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-semibold text-stone-700 hover:bg-stone-50"
        >
          {loading ? "Loading..." : "Refresh list"}
        </button>
      </header>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          {
            label: "Total",
            value: tickets.length,
          },
          {
            label: "Open",
            value: tickets.filter((t) => t.status === "Open" || t.status === "Assigned").length,
          },
          {
            label: "In progress",
            value: tickets.filter((t) => t.status === "In Progress").length,
          },
          {
            label: "Resolved / closed",
            value: tickets.filter(
              (t) => t.status === "Resolved" || t.status === "Closed"
            ).length,
          },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5"
          >
            <p className="text-sm text-stone-500">{item.label}</p>
            <p className="mt-2 text-2xl font-extrabold text-stone-900">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Search and filters */}
      <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
        <div className="flex flex-col gap-3 border-b border-stone-100 p-4 sm:p-5 lg:flex-row">
          <div className="flex h-11 flex-1 items-center gap-2 rounded-xl border border-stone-200 px-3">
            <Search size={17} className="shrink-0 text-stone-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search ticket ID, title, project or client..."
              className="w-full bg-transparent text-sm outline-none"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="text-stone-400 hover:text-stone-700"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal size={17} className="text-stone-400" />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter by status"
              className="h-11 min-w-0 flex-1 rounded-xl border border-stone-200 bg-white px-3 text-sm sm:flex-none"
            >
              <option value="All">All statuses</option>
              <option value="Open">Open</option>
              <option value="Assigned">Assigned</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => {
                setPriorityFilter(e.target.value);
                setSearchParams(
                  e.target.value === "All" ? {} : { priority: e.target.value }
                );
              }}
              aria-label="Filter by priority"
              className="h-11 min-w-0 flex-1 rounded-xl border border-stone-200 bg-white px-3 text-sm sm:flex-none"
            >
              <option value="All">All priorities</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
          <p className="text-sm text-stone-500">
            Showing{" "}
            <span className="font-semibold text-stone-800">
              {filteredTickets.length}
            </span>{" "}
            of {tickets.length} tickets
          </p>

          {(search || statusFilter !== "All" || priorityFilter !== "All") && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-xs font-semibold text-orange-800 hover:text-orange-950"
            >
              Clear filters
            </button>
          )}
        </div>

        {loading ? (
          <div className="p-10 text-center text-sm text-stone-500">
            Loading assigned tickets...
          </div>
        ) : error ? (
          <div role="alert" className="p-8 text-center">
            <p className="text-sm text-red-700">{error}</p>
            <button
              type="button"
              onClick={fetchTickets}
              className="mt-3 text-sm font-semibold text-red-800 underline"
            >
              Try again
            </button>
          </div>
        ) : filteredTickets.length > 0 ? (
          <div className="divide-y divide-stone-100">
            {filteredTickets.map((ticket) => (
              <article
                key={ticket.id}
                className="p-4 transition hover:bg-orange-50/30 sm:p-5"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex min-w-0 gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-800">
                      <Ticket size={20} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-orange-800">
                        {ticket.id}
                      </p>

                      <h2 className="mt-1 break-words text-base font-bold text-stone-900">
                        {ticket.title}
                      </h2>

                      <p className="mt-1 text-sm text-stone-500">
                        {ticket.projectName}
                      </p>

                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-stone-500">
                        <span>Client: {ticket.clientName}</span>
                        <span className="inline-flex items-center gap-1">
                          <CalendarDays size={13} />
                          {ticket.createdAt}
                        </span>
                        <span>{ticket.category}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pl-14 lg:pl-0">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        priorityStyles[ticket.priority] || priorityStyles.Low
                      }`}
                    >
                      {ticket.priority} priority
                    </span>

                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        statusStyles[ticket.status] || statusStyles.Open
                      }`}
                    >
                      {ticket.status}
                    </span>

                    <Link
                      to={`/developer/tickets/${ticket.id}`}
                      className="ml-auto inline-flex items-center gap-2 rounded-xl bg-[#C2410C] px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-orange-800 sm:ml-1"
                    >
                      View details
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="p-10 text-center">
            <Ticket size={34} className="mx-auto text-stone-300" />
            <h3 className="mt-3 font-bold text-stone-800">
              No tickets found
            </h3>
            <p className="mt-1 text-sm text-stone-500">
              Try changing your search or filters.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 rounded-xl bg-[#C2410C] px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-800"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
