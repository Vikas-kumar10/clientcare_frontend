import { useMemo } from "react";
import {
  Ticket,
  Clock3,
  LoaderCircle,
  CheckCircle2,
} from "lucide-react";

import { getAssignedTickets } from "../../data/developerData";

import DeveloperWelcome from "../../components/DeveloperComponent/DeveloperWelcome";
import SummaryCard from "../../components/DeveloperComponent/SummaryCard";
import HighPriorityAlert from "../../components/DeveloperComponent/HighPriorityAlert";
import RecentTickets from "../../components/DeveloperComponent/RecentTickets";
import WorkflowGuide from "../../components/DeveloperComponent/WorkflowGuide";

export default function DeveloperDashboard() {
  const tickets = useMemo(() => getAssignedTickets(), []);

  const counts = {
    total: tickets.length,
    open: tickets.filter((ticket) => ticket.status === "Open").length,
    inProgress: tickets.filter(
      (ticket) => ticket.status === "In Progress"
    ).length,
    resolved: tickets.filter(
      (ticket) =>
        ticket.status === "Resolved" || ticket.status === "Closed"
    ).length,
  };

  const recentTickets = [...tickets]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 4);

  const highPriorityCount = tickets.filter(
    (ticket) =>
      ticket.priority === "High" &&
      ticket.status !== "Resolved" &&
      ticket.status !== "Closed"
  ).length;

  let developer = {};

  try {
    developer = JSON.parse(localStorage.getItem("user") || "{}");
  } catch {
    developer = {};
  }

  return (
    <div className="mx-auto max-w-7xl space-y-7">
      <DeveloperWelcome name={developer.name || "Developer"} />

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
    </div>
  );
}