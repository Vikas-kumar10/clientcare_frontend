import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  AlertCircle,
  ArrowUpRight,
  CalendarDays,
  LoaderCircle,
  RotateCcw,
  Search,
  Ticket,
  UserRound,
} from "lucide-react";

import { getActivities } from "../../api/activityApi";
import { PageHeader } from "../../components/ClientComponent/UI";

function normalizeActivity(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.activity)) return response.activity;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.data?.activity)) return response.data.activity;
  return [];
}

function getActor(item) {
  return (
    item.user?.name ||
    item.actor?.name ||
    item.performedBy?.name ||
    item.userName ||
    item.actorName ||
    "System"
  );
}

function getDescription(item) {
  return (
    item.title ||
    item.description ||
    item.message ||
    item.action ||
    "Activity recorded"
  );
}

function getTicketId(item) {
  const ticket = item.ticket;
  return String(ticket?._id || ticket?.id || item.ticketId || "");
}

function formatDate(value) {
  if (!value) return "Date unavailable";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function StatCard({ label, value, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-stone-500">{label}</p>
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-700">
          <Icon size={19} />
        </span>
      </div>
      <p className="mt-4 text-3xl font-bold text-stone-900">{value}</p>
    </div>
  );
}

function ActivityItem({ item }) {
  const ticketId = getTicketId(item);
  const content = (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-700">
        {ticketId ? <Ticket size={18} /> : <Activity size={18} />}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-stone-900">
          {getDescription(item)}
        </span>
        <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-500">
          <span className="inline-flex items-center gap-1">
            <UserRound size={13} />
            {getActor(item)}
          </span>
          {ticketId && <span>Ticket #{ticketId.slice(-6).toUpperCase()}</span>}
          <span className="inline-flex items-center gap-1">
            <CalendarDays size={13} />
            {formatDate(item.createdAt || item.time || item.timestamp)}
          </span>
        </span>
      </span>
      {ticketId && (
        <ArrowUpRight size={17} className="shrink-0 text-stone-400" />
      )}
    </>
  );

  return ticketId ? (
    <Link
      to={`/admin/tickets/${ticketId}`}
      className="flex items-center gap-3 p-4 transition hover:bg-orange-50/40 sm:px-5"
    >
      {content}
    </Link>
  ) : (
    <div className="flex items-center gap-3 p-4 sm:px-5">{content}</div>
  );
}

export default function ActivityLog() {
  const [activity, setActivity] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchActivity = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getActivities();
      setActivity(normalizeActivity(response));
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to load the activity log.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActivity();
  }, [fetchActivity]);

  const filteredActivity = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return activity;
    return activity.filter((item) =>
      [
        getDescription(item),
        getActor(item),
        getTicketId(item),
        item.action,
        item.type,
      ].some((value) =>
        String(value || "")
          .toLowerCase()
          .includes(query),
      ),
    );
  }, [activity, search]);

  const todayCount = activity.filter((item) => {
    const value = item.createdAt || item.time || item.timestamp;
    if (!value) return false;
    const date = new Date(value);
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }).length;

  return (
    <div>
      <PageHeader
        eyebrow="Administration"
        title="Activity Log"
        description="Review recent actions and ticket updates across your support operations."
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatCard
          label="Total activity"
          value={activity.length}
          icon={Activity}
        />
        <StatCard
          label="Activity today"
          value={todayCount}
          icon={CalendarDays}
        />
      </div>

      <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
        <div className="flex flex-col gap-3 border-b border-stone-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div>
            <h2 className="font-bold text-stone-900">Recent actions</h2>
            <p className="mt-1 text-sm text-stone-500">
              Activity entries returned by the system.
            </p>
          </div>
          <label className="flex h-11 items-center gap-2 rounded-xl border border-stone-200 px-3 sm:w-80">
            <Search size={17} className="shrink-0 text-stone-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search activity..."
              className="w-full bg-transparent text-sm outline-none"
            />
          </label>
        </div>

        {loading ? (
          <div className="flex min-h-48 items-center justify-center gap-3 text-sm text-stone-500">
            <LoaderCircle size={20} className="animate-spin text-[#C2410C]" />{" "}
            Loading activity...
          </div>
        ) : error ? (
          <div
            role="alert"
            className="flex flex-col items-center gap-3 p-8 text-center"
          >
            <AlertCircle size={28} className="text-rose-600" />
            <p className="text-sm text-rose-700">{error}</p>
            <button
              type="button"
              onClick={fetchActivity}
              className="inline-flex items-center gap-2 rounded-lg bg-[#C2410C] px-4 py-2 text-sm font-semibold text-white hover:bg-orange-800"
            >
              <RotateCcw size={15} /> Try again
            </button>
          </div>
        ) : filteredActivity.length ? (
          <div className="divide-y divide-stone-100">
            {filteredActivity.map((item, index) => (
              <ActivityItem key={item._id || item.id || index} item={item} />
            ))}
          </div>
        ) : (
          <div className="px-5 py-14 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-100 text-stone-500">
              <Activity size={22} />
            </span>
            <h3 className="mt-4 text-sm font-bold text-stone-900">
              {search ? "No matching activity" : "No activity recorded yet"}
            </h3>
            <p className="mt-1 text-sm text-stone-500">
              {search
                ? "Try a different search term."
                : "New ticket and account actions will appear here."}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
