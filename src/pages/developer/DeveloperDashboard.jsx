import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Ticket,
  Clock3,
  LoaderCircle,
  CheckCircle2,
} from "lucide-react";

import { getTickets } from "../../api/ticketApi";

import DeveloperWelcome from "../../components/DeveloperComponent/DeveloperWelcome";
import SummaryCard from "../../components/DeveloperComponent/SummaryCard";
import HighPriorityAlert from "../../components/DeveloperComponent/HighPriorityAlert";
import RecentTickets from "../../components/DeveloperComponent/RecentTickets";
import WorkflowGuide from "../../components/DeveloperComponent/WorkflowGuide";

export default function DeveloperDashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

      setTickets(
        ticketList.map((ticket) => ({
          ...ticket,
          id: ticket._id || ticket.id,
          projectName: ticket.project?.name || ticket.projectName || "Unknown project",
          clientName: ticket.client?.name || ticket.clientName || "Unknown client",
        }))
      );
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to load assigned tickets."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const counts = useMemo(() => ({
    total: tickets.length,
    open: tickets.filter(
      (ticket) => ticket.status === "Open" || ticket.status === "Assigned"
    ).length,
    inProgress: tickets.filter(
      (ticket) => ticket.status === "In Progress"
    ).length,
    resolved: tickets.filter(
      (ticket) =>
        ticket.status === "Resolved" || ticket.status === "Closed"
    ).length,
  }), [tickets]);

  const recentTickets = useMemo(() => [...tickets]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 4), [tickets]);

  const highPriorityCount = useMemo(() => tickets.filter(
    (ticket) =>
      ticket.priority === "High" &&
      ticket.status !== "Resolved" &&
      ticket.status !== "Closed"
  ).length, [tickets]);

  let developer = {};

  try {
    developer = JSON.parse(localStorage.getItem("user") || "{}");
  } catch {
    developer = {};
  }

  return (
    <div className="mx-auto max-w-7xl space-y-7">
      <DeveloperWelcome name={developer.name || "Developer"} />

      {loading ? (
        <div className="rounded-2xl border border-stone-200 bg-white p-8 text-center text-sm text-stone-600">
          Loading your assigned tickets...
        </div>
      ) : error ? (
        <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-5">
          <p className="text-sm text-red-700">{error}</p>
          <button
            type="button"
            onClick={fetchTickets}
            className="mt-3 text-sm font-semibold text-red-800 underline"
          >
            Try again
          </button>
        </div>
      ) : (
        <>

      <section>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-stone-900">
            Ticket overview
          </h2>
          <p className="mt-1 text-sm text-stone-500">
            A summary of the tickets assigned to you.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            label="Assigned tickets"
            value={counts.total}
            description="All tickets assigned to you"
            icon={Ticket}
            color="bg-orange-50 text-orange-700"
          />

          <SummaryCard
            label="Open tickets"
            value={counts.open}
            description="Waiting for work to start"
            icon={Clock3}
            color="bg-amber-50 text-amber-700"
          />

          <SummaryCard
            label="In progress"
            value={counts.inProgress}
            description="Issues currently being worked on"
            icon={LoaderCircle}
            color="bg-orange-50 text-orange-700"
          />

          <SummaryCard
            label="Resolved / closed"
            value={counts.resolved}
            description="Issues marked as completed"
            icon={CheckCircle2}
            color="bg-emerald-50 text-emerald-700"
          />
        </div>
      </section>

      <HighPriorityAlert count={highPriorityCount} />

      <RecentTickets tickets={recentTickets} />

      <WorkflowGuide />
        </>
      )}
    </div>
  );
}
