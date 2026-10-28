
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  MessageSquare,
  UserRound,
  CalendarDays,
  AlertTriangle,
} from "lucide-react";
import { getUsers } from "../../api/userApi";
import { getTicketById, reviewTicket } from "../../api/ticketApi";
import { PageHeader, StatusBadge, PriorityBadge } from "../../components/ClientComponent/UI";
import { DeveloperCard } from "../../components/ClientComponent/TicketComponents";

export default function TicketDetailsAdmin() {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [developerId, setDeveloperId] = useState("");
  const [status, setStatus] = useState("Open");
  const [priority, setPriority] = useState("Medium");
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);
  const [developers, setDevelopers] = useState([]);
  const [developersLoading, setDevelopersLoading] = useState(true);
  const [developersError, setDevelopersError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    let active = true;

    const loadDevelopers = async () => {
      setDevelopersLoading(true);
      setDevelopersError("");

      try {
        const response = await getUsers({ role: "developer" });
        const list = Array.isArray(response?.users) ? response.users : [];
        if (active) {
          setDevelopers(list.map((user) => {
            const id = String(user._id || user.id);
            return {
              ...user,
              id,
              role: "Developer",
              initials: (user.name || "Developer")
                .split(" ")
                .filter(Boolean)
                .map((part) => part[0])
                .join("")
                .slice(0, 2)
                .toUpperCase(),
            };
          }));
        }
      } catch (error) {
        if (active) {
          setDevelopersError(
            error.response?.data?.message || "Unable to load developers."
          );
        }
      } finally {
        if (active) setDevelopersLoading(false);
      }
    };

    loadDevelopers();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;

    const loadTicket = async () => {
      setLoading(true);
      setLoadError("");
      setTicket(null);

      try {
        const response = await getTicketById(ticketId);
        const data = response?.ticket || response?.data?.ticket || response?.data || response;
        const loadedTicket = data && typeof data === "object" ? data : null;

        if (!loadedTicket || !(loadedTicket._id || loadedTicket.id)) {
          throw new Error("Ticket details were not found.");
        }

        if (active) {
          setTicket({
            ...loadedTicket,
            id: String(loadedTicket._id || loadedTicket.id),
            clientName:
              loadedTicket.client?.name || loadedTicket.clientName || "Unknown client",
            projectName:
              loadedTicket.project?.name || loadedTicket.projectName || "Unknown project",
            assignedTo:
              loadedTicket.assignedDeveloper || loadedTicket.assignedTo || null,
          });
          setDeveloperId(
            loadedTicket.assignedDeveloper?._id ||
              loadedTicket.assignedDeveloper?.id ||
              loadedTicket.assignedTo?._id ||
              loadedTicket.assignedTo?.id ||
              ""
          );
          setStatus(loadedTicket.status || "Open");
          setPriority(loadedTicket.priority || "Medium");
        }
      } catch (error) {
        if (active) {
          setLoadError(
            error.response?.data?.message || error.message || "Unable to load ticket."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    loadTicket();
    return () => {
      active = false;
    };
  }, [ticketId]);

  if (loading) {
    return <div className="rounded-2xl border border-stone-200 bg-white p-8 text-center text-sm text-stone-500">Loading ticket...</div>;
  }

  if (!ticket) {
    return (
      <div className="rounded-2xl border border-stone-200 bg-white p-8 text-center">
        <AlertTriangle size={32} className="mx-auto text-orange-700" />
        <h1 className="mt-3 text-xl font-bold">{loadError ? "Unable to load ticket" : "Ticket not found"}</h1>
        {loadError && <p className="mt-2 text-sm text-stone-500">{loadError}</p>}
        <Link to="/admin/tickets" className="mt-4 inline-block text-sm font-semibold text-orange-700">
          Back to all tickets
        </Link>
      </div>
    );
  }

  const saveChanges = async (event) => {
    event.preventDefault();
    setSaving(true);
    setSaveError("");
    setSaved(false);

    try {
      const response = await reviewTicket(ticket.id, {
        developerId: developerId || null,
        status,
        priority,
      });
      const updated = response.ticket;
      const assignedDeveloper = updated.assignedDeveloper || null;

      setTicket((current) => ({
        ...current,
        ...updated,
        id: String(updated._id || updated.id || current.id),
        clientName: updated.client?.name || current.clientName,
        projectName: updated.project?.name || current.projectName,
        assignedTo: assignedDeveloper
          ? {
              ...assignedDeveloper,
              id: String(assignedDeveloper._id || assignedDeveloper.id),
              role: "Developer",
              initials: (assignedDeveloper.name || "Developer")
                .split(" ")
                .filter(Boolean)
                .map((part) => part[0])
                .join("")
                .slice(0, 2)
                .toUpperCase(),
            }
          : null,
      }));
      setDeveloperId(assignedDeveloper?._id || assignedDeveloper?.id || "");
      setStatus(updated.status);
      setPriority(updated.priority);
      setSaved(true);
    } catch (error) {
      setSaveError(error.response?.data?.message || "Unable to save ticket assignment.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <Link
        to="/admin/tickets"
        className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-stone-500 hover:text-orange-800"
      >
        <ArrowLeft size={16} /> Back to all tickets
      </Link>

      <PageHeader
        eyebrow={`Admin review · ${ticket.id}`}
        title={ticket.title}
        description="Review the client's issue, select the responsible developer and update the ticket."
        action={<StatusBadge status={ticket.status} />}
      />

      {saved && (
        <div className="mb-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
          <CheckCircle2 size={19} className="shrink-0" />
          <div>
            <p className="font-semibold">Ticket assignment saved</p>
            <p className="mt-1 text-xs">The assigned developer will see this ticket in their workspace.</p>
          </div>
        </div>
      )}

      {saveError && (
        <div role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {saveError}
        </div>
      )}

      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_350px]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-700">
                <FileText size={21} />
              </div>
              <div>
                <p className="text-xs text-stone-400">Issue reported by</p>
                <h2 className="font-bold text-stone-900">{ticket.clientName}</h2>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-stone-50 p-4">
                <p className="text-xs text-stone-500">Project</p>
                <p className="mt-1 font-semibold text-stone-900">{ticket.projectName}</p>
              </div>
              <div className="rounded-xl bg-stone-50 p-4">
                <p className="text-xs text-stone-500">Reported on</p>
                <p className="mt-1 font-semibold text-stone-900">{ticket.createdAt}</p>
              </div>
            </div>

            <h3 className="mt-6 font-bold text-stone-900">Issue description</h3>
            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-stone-600">
              {ticket.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <PriorityBadge priority={ticket.priority} />
              <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-600">
                {ticket.category}
              </span>
            </div>
          </section>

          {ticket.resolution && (
            <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={19} className="text-emerald-700" />
                <h2 className="font-bold text-emerald-900">Developer resolution</h2>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-emerald-900">
                {ticket.resolution}
              </p>
            </section>
          )}

          <section className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-100 text-stone-700">
                <UserRound size={20} />
              </div>
              <div>
                <h2 className="font-bold text-stone-900">Current assignment</h2>
                <p className="mt-1 text-xs text-stone-500">Assigned developer details</p>
              </div>
            </div>
            <div className="mt-4">
              <DeveloperCard developer={ticket.assignedTo} />
            </div>
          </section>

          <section className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <MessageSquare size={19} className="text-orange-700" />
              <h2 className="font-bold text-stone-900">Internal review note</h2>
            </div>
            <p className="mt-1 text-xs text-stone-500">
              Demo field for admin review; this is not sent to the client.
            </p>
            <textarea
              rows={4}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Write the investigation notes or instructions for the developer..."
              className="mt-4 w-full resize-y rounded-xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
            />
          </section>
        </div>

        <aside className="space-y-5">
          <form onSubmit={saveChanges} className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <ClipboardCheck size={20} className="text-orange-700" />
              <h2 className="font-bold text-stone-900">Review & assign</h2>
            </div>
            <p className="mt-1 text-xs text-stone-500">
              Update the assignment and ticket status.
            </p>

            <label className="mt-6 block text-sm font-semibold text-stone-700">
              Assign developer
            </label>
            <select
              value={developerId}
              disabled={developersLoading || Boolean(developersError)}
              onChange={(e) => {
                const nextDeveloperId = e.target.value;
                setDeveloperId(nextDeveloperId);
                setStatus((current) => {
                  if (nextDeveloperId && current === "Open") return "Assigned";
                  if (!nextDeveloperId && current === "Assigned") return "Open";
                  return current;
                });
                setSaved(false);
                setSaveError("");
              }}
              className="mt-2 w-full rounded-xl border border-stone-200 bg-white px-3 py-3 text-sm outline-none focus:border-orange-500"
            >
              <option value="">Unassigned</option>
              {developers.map((developer) => (
                <option key={developer.id} value={developer.id}>
                  {developer.name}
                </option>
              ))}
            </select>
            {developersLoading && (
              <p className="mt-2 text-xs text-stone-500">Loading developers...</p>
            )}
            {developersError && (
              <p role="alert" className="mt-2 text-xs text-red-700">
                {developersError}
              </p>
            )}
            {!developersLoading && !developersError && developers.length === 0 && (
              <p className="mt-2 text-xs text-stone-500">No developer accounts found.</p>
            )}

            <label className="mt-5 block text-sm font-semibold text-stone-700">
              Ticket status
            </label>
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setSaved(false);
              }}
              className="mt-2 w-full rounded-xl border border-stone-200 bg-white px-3 py-3 text-sm outline-none focus:border-orange-500"
            >
              <option>Open</option>
              <option>Assigned</option>
              <option>In Progress</option>
              <option>Resolved</option>
              <option>Closed</option>
            </select>

            <label className="mt-5 block text-sm font-semibold text-stone-700">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => {
                setPriority(e.target.value);
                setSaved(false);
              }}
              className="mt-2 w-full rounded-xl border border-stone-200 bg-white px-3 py-3 text-sm outline-none focus:border-orange-500"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>

            <button
              type="submit"
              disabled={saving || developersLoading || Boolean(developersError)}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#C2410C] px-4 py-3 text-sm font-semibold text-white hover:bg-orange-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <CheckCircle2 size={17} /> {saving ? "Saving..." : "Save changes"}
            </button>
          </form>

          <div className="rounded-2xl bg-[#292524] p-5 text-white">
            <CalendarDays size={21} className="text-orange-300" />
            <h3 className="mt-3 font-bold">Admin checklist</h3>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-stone-300">
              <li>• Understand the reported issue.</li>
              <li>• Choose a suitable developer.</li>
              <li>• Set the appropriate priority.</li>
              <li>• Keep the ticket status up to date.</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
