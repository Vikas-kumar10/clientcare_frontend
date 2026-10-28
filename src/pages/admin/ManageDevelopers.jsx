import { useCallback, useEffect, useMemo, useState } from "react";
import { Plus, CheckCircle2, X } from "lucide-react";

import { getUsers } from "../../api/userApi";
import { PageHeader } from "../../components/ClientComponent/UI";
import DeveloperStats from "../../components/AdminComponent/ManageDeveloperComponent/DeveloperStats";
import DeveloperForm from "../../components/AdminComponent/ManageDeveloperComponent/DeveloperForm";
import DeveloperFilters from "../../components/AdminComponent/ManageDeveloperComponent/DeveloperFilters";
import DeveloperTable from "../../components/AdminComponent/ManageDeveloperComponent/DeveloperTable";

const blankDeveloper = {
  name: "",
  email: "",
  role: "Developer",
  company: "ClientCare",
  status: "Active",
};

export default function ManageDevelopers() {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ ...blankDeveloper });
  const [message, setMessage] = useState("");

  const fetchDevelopers = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getUsers({ role: "developer" });
      const users = Array.isArray(response?.users) ? response.users : [];
      setDevelopers(
        users
          .filter((user) => user.role?.toLowerCase() === "developer")
          .map((user) => {
            const name = user.name || "Developer";
            return {
              ...user,
              id: String(user._id || user.id),
              role: "Developer",
              status: user.status || "Active",
              initials: name
                .split(/\s+/)
                .slice(0, 2)
                .map((part) => part[0]?.toUpperCase())
                .join(""),
            };
          }),
      );
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load developers.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDevelopers();
  }, [fetchDevelopers]);

  const filteredDevelopers = useMemo(() => {
    return developers.filter((developer) => {
      const searchText = `${developer.name} ${developer.email} ${developer.company || ""}`.toLowerCase();
      return searchText.includes(search.toLowerCase()) &&
        (statusFilter === "All" || developer.status === statusFilter);
    });
  }, [developers, search, statusFilter]);

  const activeCount = developers.filter((developer) => developer.status === "Active").length;

  const openCreate = () => {
    setEditingId(null);
    setForm({ ...blankDeveloper });
    setMessage("");
    setShowForm(true);
  };

  const openEdit = (developer) => {
    setEditingId(developer.id);
    setForm({
      name: developer.name,
      email: developer.email,
      role: "Developer",
      company: developer.company || "",
      status: developer.status,
    });
    setMessage("");
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm({ ...blankDeveloper });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = form.name.trim();

    if (editingId) {
      setDevelopers((current) => current.map((developer) =>
        developer.id === editingId
          ? {
              ...developer,
              ...form,
              name,
              role: "Developer",
              initials: name.split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase()).join(""),
            }
          : developer
      ));
      setMessage("Developer account updated in this demo.");
    } else {
      const newDeveloper = {
        ...form,
        name,
        role: "Developer",
        id: `USR-${Date.now().toString().slice(-6)}`,
        initials: name.split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase()).join(""),
      };
      setDevelopers((current) => [newDeveloper, ...current]);
      setMessage("Developer added in this demo. No invitation email was sent.");
    }

    closeForm();
  };

  const toggleStatus = (developer) => {
    const nextStatus = developer.status === "Active" ? "Suspended" : "Active";
    setDevelopers((current) => current.map((item) =>
      item.id === developer.id ? { ...item, status: nextStatus } : item
    ));
    setMessage(`${developer.name}: developer account marked ${nextStatus.toLowerCase()}.`);
  };

  return (
    <div>
      <PageHeader
        eyebrow="Administration"
        title="Manage Developers"
        description="Manage your technical support team, update developer details and control account access."
        action={
          <button type="button" onClick={openCreate} className="inline-flex items-center gap-2 rounded-xl bg-[#C2410C] px-4 py-3 text-sm font-semibold text-white hover:bg-orange-800">
            <Plus size={17} /> Add developer
          </button>
        }
      />

      <DeveloperStats total={developers.length} active={activeCount} />

      {message && (
        <div className="mb-5 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
          <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
          <div>{message}<p className="mt-1 text-xs">Demo only. Changes are not persisted.</p></div>
          <button type="button" onClick={() => setMessage("")} aria-label="Dismiss message" className="ml-auto"><X size={16} /></button>
        </div>
      )}

      {error && (
        <div role="alert" className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <span>{error}</span>
          <button
            type="button"
            onClick={fetchDevelopers}
            className="shrink-0 font-semibold underline"
          >
            Retry
          </button>
        </div>
      )}

      {showForm && <DeveloperForm form={form} setForm={setForm} editingId={editingId} onSubmit={handleSubmit} onClose={closeForm} />}

      <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
        <DeveloperFilters search={search} setSearch={setSearch} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
        {loading ? (
          <div className="p-10 text-center text-sm text-stone-500">
            Loading developers...
          </div>
        ) : error ? null : (
          <DeveloperTable developers={filteredDevelopers} onEdit={openEdit} onToggleStatus={toggleStatus} />
        )}
      </section>
    </div>
  );
}
