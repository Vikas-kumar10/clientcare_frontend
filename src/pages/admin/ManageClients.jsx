
import { useCallback, useEffect, useMemo, useState } from "react";
import { Plus, X, CheckCircle2, LoaderCircle, AlertCircle } from "lucide-react";

import { PageHeader } from "../../components/ClientComponent/UI";
import ClientStats from "../../components/AdminComponent/ManageClientComponent/ClientStats";
import ClientForm from "../../components/AdminComponent/ManageClientComponent/ClientForm";
import ClientFilters from "../../components/AdminComponent/ManageClientComponent/ClientFilters";
import ClientTable from "../../components/AdminComponent/ManageClientComponent/ClientTable";

const blankClient = {
  name: "",
  email: "",
  role: "Client",
  company: "",
  status: "Active",
};

// Change this endpoint if your backend uses a different route.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const CLIENTS_ENDPOINT = `${API_URL}/users`;

function normalizeClient(user) {
  const name = user.name || user.fullName || "";

  const rawStatus = String(user.status || "Active").toLowerCase();
  const status =
    ["suspended", "inactive", "blocked"].includes(rawStatus)
      ? "Suspended"
      : "Active";

  return {
    ...user,
    id: String(user._id || user.id),
    name,
    email: user.email || "",
    role: "Client",
    company: user.company || user.companyName || "",
    status,
    initials:
      user.initials ||
      name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join(""),
  };
}

export default function ManageClients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ ...blankClient });
  const [message, setMessage] = useState("");

  const fetchClients = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(CLIENTS_ENDPOINT, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.message || result.error || "Unable to fetch clients."
        );
      }

      // Supports common API response shapes.
      const users = Array.isArray(result)
        ? result
        : Array.isArray(result.users)
          ? result.users
          : Array.isArray(result.data)
            ? result.data
            : Array.isArray(result.data?.users)
              ? result.data.users
              : Array.isArray(result.clients)
                ? result.clients
                : [];

      const clientUsers = users
        .filter((user) =>
          String(user.role || "").toLowerCase() === "client"
        )
        .map(normalizeClient);

      setClients(clientUsers);
    } catch (err) {
      setError(err.message || "Something went wrong while fetching clients.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const filteredClients = useMemo(() => {
    const query = search.trim().toLowerCase();

    return clients.filter((client) => {
      const searchableText =
        `${client.name} ${client.email} ${client.company}`.toLowerCase();

      return (
        searchableText.includes(query) &&
        (statusFilter === "All" || client.status === statusFilter)
      );
    });
  }, [clients, search, statusFilter]);

  const activeCount = clients.filter(
    (client) => client.status === "Active"
  ).length;

  const openCreate = () => {
    setEditingId(null);
    setForm({ ...blankClient });
    setMessage("");
    setShowForm(true);
  };

  const openEdit = (client) => {
    setEditingId(client.id);
    setForm({
      name: client.name,
      email: client.email,
      role: "Client",
      company: client.company,
      status: client.status,
    });
    setMessage("");
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm({ ...blankClient });
  };

  // Client creation and editing are not connected to the API yet.
  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage(
      "Client create/update API is not connected yet. No changes were saved."
    );
  };

  // Status changes are not connected to the API yet.
  const toggleStatus = () => {
    setMessage(
      "Client status API is not connected yet. No changes were saved."
    );
  };

  return (
    <div>
      <PageHeader
        eyebrow="Administration"
        title="Manage Clients"
        description="View client accounts, search records and manage client access."
        action={
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center gap-2 rounded-xl bg-[#C2410C] px-4 py-3 text-sm font-semibold text-white hover:bg-orange-800"
          >
            <Plus size={17} />
            Add client
          </button>
        }
      />

      <ClientStats total={clients.length} active={activeCount} />

      {message && (
        <div className="mb-5 flex items-start gap-2 rounded-xl border border-orange-200 bg-orange-50 p-4 text-sm text-orange-800">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <p>{message}</p>
          <button
            type="button"
            onClick={() => setMessage("")}
            aria-label="Dismiss message"
            className="ml-auto"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {showForm && (
        <ClientForm
          form={form}
          setForm={setForm}
          editingId={editingId}
          onSubmit={handleSubmit}
          onClose={closeForm}
        />
      )}

      <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
        <ClientFilters
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        {loading ? (
          <div className="flex min-h-48 items-center justify-center gap-3 text-sm text-stone-500">
            <LoaderCircle size={20} className="animate-spin text-[#C2410C]" />
            Fetching clients...
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center gap-3 p-8 text-center">
            <AlertCircle size={28} className="text-rose-600" />
            <p className="text-sm text-rose-700">{error}</p>
            <button
              type="button"
              onClick={fetchClients}
              className="rounded-lg bg-[#C2410C] px-4 py-2 text-sm font-semibold text-white hover:bg-orange-800"
            >
              Try again
            </button>
          </div>
        ) : (
          <ClientTable
            clients={filteredClients}
            onEdit={openEdit}
            onToggleStatus={toggleStatus}
          />
        )}
      </section>
    </div>
  );
}
