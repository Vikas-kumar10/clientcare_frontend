import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { getTickets } from "../../api/ticketApi";
import { getActivities } from "../../api/activityApi";
import { useAuth } from "../../context/AuthContext";

import {
  clientUser,
  projects,
} from "../../data/mockData";

import { PageHeader } from "../../components/ClientComponent/UI";

import DashboardStats from "../../components/ClientComponent/DashboardStats";
import RecentTickets from "../../components/ClientComponent/RecentTickets";
import TicketOverview from "../../components/ClientComponent/TicketOverview";
import ProjectsSection from "../../components/ClientComponent/ProjectsSection";
import RecentActivity from "../../components/ClientComponent/RecentActivity";

export default function Dashboard() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [ticketsLoading, setTicketsLoading] = useState(true);
  const [ticketsError, setTicketsError] = useState("");
  const [activity, setActivity] = useState([]);
  const [activityLoading, setActivityLoading] = useState(true);
  const [activityError, setActivityError] = useState("");

  const fetchTickets = useCallback(async () => {
    setTicketsLoading(true);
    setTicketsError("");
    try {
      const response = await getTickets();
      const list = Array.isArray(response?.tickets) ? response.tickets : [];
      setTickets(list.map((ticket) => ({
        ...ticket,
        id: ticket._id || ticket.id,
        projectName: ticket.project?.name || ticket.projectName || "Unknown project",
      })));
    } catch (error) {
      setTicketsError(
        error.response?.data?.message || "Unable to load your support tickets."
      );
    } finally {
      setTicketsLoading(false);
    }
  }, []);

  const fetchActivity = useCallback(async () => {
    setActivityLoading(true);
    setActivityError("");
    try {
      const response = await getActivities({ limit: 10 });
      setActivity(Array.isArray(response?.activities) ? response.activities : []);
    } catch (error) {
      setActivityError(
        error.response?.data?.message || "Unable to load recent activity."
      );
    } finally {
      setActivityLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTickets();
    fetchActivity();
  }, [fetchTickets, fetchActivity]);

  const openCount = tickets.filter((ticket) =>
    ["Open", "Assigned"].includes(ticket.status)
  ).length;

  const inProgressCount = tickets.filter(
    (ticket) => ticket.status === "In Progress"
  ).length;

  const resolvedCount = tickets.filter((ticket) =>
    ["Resolved", "Closed"].includes(ticket.status)
  ).length;

  const stats = [
    tickets.length,
    openCount,
    inProgressCount,
    resolvedCount,
  ];

  return (
    <div>
      {/* Page Header */}
      <PageHeader
        eyebrow="Client workspace"
        title={`Good afternoon, ${(user?.name || clientUser.name).split(" ")[0]} 👋`}
        description="Here's what's happening with your projects and support requests."
        action={
          <Link
            to="/client/create-ticket"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C2410C] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-800"
          >
            <Plus size={18} />
            Create ticket
          </Link>
        }
      />

      {/* Dashboard Statistics */}
      <DashboardStats stats={stats} />

      {/* Recent Tickets and Overview */}
      <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <RecentTickets
          tickets={tickets}
          loading={ticketsLoading}
          error={ticketsError}
          onRetry={fetchTickets}
        />

        <TicketOverview
          tickets={tickets}
          loading={ticketsLoading}
          error={ticketsError}
          onRetry={fetchTickets}
        />
      </section>

      {/* Projects */}
      <ProjectsSection projects={projects} />

      {/* Recent Activity */}
      <RecentActivity
        activity={activity}
        loading={activityLoading}
        error={activityError}
        onRetry={fetchActivity}
      />
    </div>
  );
}
