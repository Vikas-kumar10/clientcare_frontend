import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  FolderKanban,
  Ticket,
  CircleAlert,
  CheckCircle2,
  CalendarDays,
  UserRound,
  RefreshCw,
  LoaderCircle,
  AlertCircle,
  ExternalLink,
  FileText,
} from "lucide-react";

import { getProjectById } from "../../api/projectApi";
import { getTickets } from "../../api/ticketApi";
import { StatusBadge } from "../../components/ClientComponent/UI";

const getId = (value) => {
  if (!value) return "";
  return String(value._id || value.id || value);
};

const formatDate = (value) => {
  if (!value) return "Not set";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Not set";

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const getClientName = (project) => {
  const client = project?.client;

  if (typeof client === "string") {
    return "Client information unavailable";
  }

  return (
    client?.name ||
    client?.fullName ||
    project?.clientName ||
    "Client not assigned"
  );
};

const getTicketTitle = (ticket) =>
  ticket.title || ticket.subject || "Untitled ticket";

function StatCard({ label, value, icon: Icon, tone = "stone" }) {
  const tones = {
    stone: "bg-stone-50 text-stone-700 border-stone-200",
    orange: "bg-orange-50 text-orange-800 border-orange-100",
    green: "bg-emerald-50 text-emerald-800 border-emerald-100",
  };

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-stone-500">{label}</p>
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-xl border ${tones[tone]}`}
        >
          <Icon size={19} />
        </span>
      </div>

      <p className="mt-4 text-3xl font-bold text-stone-900">{value}</p>
    </div>
  );
}

function TicketRow({ ticket }) {
  const status = ticket.status || "Open";
  const priority = ticket.priority || "Medium";

  const priorityStyles = {
    Low: "bg-stone-100 text-stone-600",
    Medium: "bg-amber-50 text-amber-700",
    High: "bg-orange-50 text-orange-800",
    Critical: "bg-red-50 text-red-700",
  };

  return (
    <article className="flex flex-col gap-4 p-4 transition hover:bg-stone-50 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-[#C2410C]">
          <Ticket size={18} />
        </span>

        <div className="min-w-0">
          <h3 className="break-words text-sm font-semibold text-stone-900">
            {getTicketTitle(ticket)}
          </h3>

          <p className="mt-1 text-xs text-stone-500">
            Created {formatDate(ticket.createdAt)}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <StatusBadge status={status} />

            <span
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                priorityStyles[priority] || priorityStyles.Medium
              }`}
            >
              {priority} priority
            </span>
          </div>
        </div>
      </div>

      <Link
        to={`/admin/tickets/${ticket._id || ticket.id}`}
        className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-lg border border-stone-200 px-3 py-2 text-xs font-semibold text-stone-700 transition hover:border-orange-300 hover:text-[#C2410C] sm:self-center"
      >
        View ticket
        <ExternalLink size={14} />
      </Link>
    </article>
  );
}

export default function ProjectDetails() {
  const { projectId } = useParams();

  const [project, setProject] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDetails = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [projectResponse, ticketsResponse] = await Promise.all([
        getProjectById(projectId),
        getTickets(),
      ]);

      const projectData = projectResponse?.data ?? projectResponse;
      const actualProject =
        projectData?.project || projectData?.data || projectData;

      const ticketData = ticketsResponse?.data ?? ticketsResponse;

      const allTickets = Array.isArray(ticketData)
        ? ticketData
        : Array.isArray(ticketData?.tickets)
          ? ticketData.tickets
          : Array.isArray(ticketData?.data)
            ? ticketData.data
            : [];

      if (
        !actualProject ||
        typeof actualProject !== "object" ||
        !(actualProject._id || actualProject.id)
      ) {
        throw new Error("Project details were not found.");
      }

      setProject(actualProject);

      setTickets(
        allTickets.filter(
          (ticket) => getId(ticket.project) === String(projectId),
        ),
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to load project details.",
      );
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  if (loading) {
    return (
      <div className="flex min-h-64 items-center justify-center gap-3 text-sm text-stone-500">
        <LoaderCircle size={20} className="animate-spin text-[#C2410C]" />
        Loading project details...
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="rounded-2xl border border-stone-200 bg-white p-8 text-center">
        <AlertCircle size={32} className="mx-auto text-red-500" />

        <h2 className="mt-3 text-lg font-bold text-stone-900">
          Unable to load project
        </h2>

        <p className="mt-2 text-sm text-stone-500">
          {error || "This project could not be found."}
        </p>

        <div className="mt-5 flex justify-center gap-3">
          <button
            type="button"
            onClick={fetchDetails}
            className="inline-flex items-center gap-2 rounded-xl bg-[#C2410C] px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-800"
          >
            <RefreshCw size={15} />
            Try again
          </button>

          <Link
            to="/admin/projects"
            className="rounded-xl border border-stone-200 px-4 py-2.5 text-sm font-semibold text-stone-700"
          >
            Back to projects
          </Link>
        </div>
      </div>
    );
  }

  const totalTickets = tickets.length;

  const openIssues = tickets.filter((ticket) =>
    ["Open", "Assigned", "In Progress"].includes(ticket.status),
  ).length;

  const resolvedTickets = tickets.filter((ticket) =>
    ["Resolved", "Closed"].includes(ticket.status),
  ).length;

  const clientName = getClientName(project);

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div>
        <Link
          to="/admin/projects"
          className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-stone-500 transition hover:text-[#C2410C]"
        >
          <ArrowLeft size={16} />
          Back to projects
        </Link>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-[#C2410C]">
              <FolderKanban size={26} />
            </span>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C2410C]">
                Project overview
              </p>

              <h1 className="mt-1 break-words text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
                {project.name}
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-500">
                {project.description || "No project description provided."}
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <StatusBadge status={project.status || "Active"} />
          </div>
        </div>
      </div>

      {/* Project information */}
      <section className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6">
        <h2 className="text-base font-bold text-stone-900">
          Project information
        </h2>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          <div className="flex items-start gap-3">
            <span className="rounded-xl bg-stone-100 p-2.5 text-stone-600">
              <UserRound size={18} />
            </span>

            <div className="min-w-0">
              <p className="text-xs text-stone-500">Client</p>
              <p className="mt-1 break-words text-sm font-semibold text-stone-800">
                {clientName}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="rounded-xl bg-stone-100 p-2.5 text-stone-600">
              <CalendarDays size={18} />
            </span>

            <div>
              <p className="text-xs text-stone-500">Delivery deadline</p>
              <p className="mt-1 text-sm font-semibold text-stone-800">
                {formatDate(project.deadline || project.deliveryDate)}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="rounded-xl bg-stone-100 p-2.5 text-stone-600">
              <FileText size={18} />
            </span>

            <div>
              <p className="text-xs text-stone-500">Project ID</p>
              <p className="mt-1 break-all text-sm font-semibold text-stone-800">
                {getId(project)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ticket statistics */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total tickets" value={totalTickets} icon={Ticket} />

        <StatCard
          label="Open issues"
          value={openIssues}
          icon={CircleAlert}
          tone="orange"
        />

        <StatCard
          label="Resolved / closed"
          value={resolvedTickets}
          icon={CheckCircle2}
          tone="green"
        />
      </section>

      {/* Related tickets */}
      <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
        <div className="flex flex-col gap-2 border-b border-stone-100 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-stone-900">
              Related tickets
            </h2>

            <p className="mt-1 text-sm text-stone-500">
              Issues reported for this project.
            </p>
          </div>

          <span className="w-fit rounded-full bg-stone-100 px-3 py-1.5 text-xs font-semibold text-stone-600">
            {totalTickets} {totalTickets === 1 ? "ticket" : "tickets"}
          </span>
        </div>

        {tickets.length > 0 ? (
          <div className="divide-y divide-stone-100">
            {tickets.map((ticket) => (
              <TicketRow key={getId(ticket)} ticket={ticket} />
            ))}
          </div>
        ) : (
          <div className="px-5 py-12 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-100 text-stone-500">
              <Ticket size={22} />
            </span>

            <h3 className="mt-4 text-sm font-bold text-stone-900">
              No tickets yet
            </h3>

            <p className="mt-1 text-sm text-stone-500">
              Tickets created for this project will appear here.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
