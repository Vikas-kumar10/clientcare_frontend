import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

import {
  clientUser,
  projects,
  tickets,
  activity,
} from "../../data/mockData";

import { PageHeader } from "../../components/ClientComponent/UI";

import DashboardStats from "../../components/ClientComponent/DashboardStats";
import RecentTickets from "../../components/ClientComponent/RecentTickets";
import TicketOverview from "../../components/ClientComponent/TicketOverview";
import ProjectsSection from "../../components/ClientComponent/ProjectsSection";
import RecentActivity from "../../components/ClientComponent/RecentActivity";

export default function Dashboard() {
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
        title={`Good afternoon, ${clientUser.name.split(" ")[0]} 👋`}
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
        <RecentTickets tickets={tickets} />

        <TicketOverview
          tickets={tickets}
          inProgressCount={inProgressCount}
          resolvedCount={resolvedCount}
        />
      </section>

      {/* Projects */}
      <ProjectsSection projects={projects} />

      {/* Recent Activity */}
      <RecentActivity activity={activity} />
    </div>
  );
}