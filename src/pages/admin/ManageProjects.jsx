
import { useCallback, useEffect, useState } from "react";
import {
  Plus,
  CheckCircle2,
  AlertCircle,
  LoaderCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { PageHeader } from "../../components/ClientComponent/UI";
import ProjectStats from "../../components/AdminComponent/ProjectComponent/ProjectStats";
import ProjectForm from "../../components/AdminComponent/ProjectComponent/ProjectForm";
import ProjectSearch from "../../components/AdminComponent/ProjectComponent/ProjectSearch";
import ProjectList from "../../components/AdminComponent/ProjectComponent/ProjectList";

import {
  getProjects,
  createProject,
  updateProject,
} from "../../api/projectApi";

import { getTickets } from "../../api/ticketApi";

const blankProject = {
  name: "",
  category: "Web Application",
  description: "",
  status: "Active",
  progress: 0,
  deliveryDate: "",
  color: "#C2410C",
  initials: "",
};

// Normalize backend project data for the UI.
function normalizeProject(project) {
  const name = project.name || "";

  return {
    ...project,
    id: project._id || project.id,
    name,
    category: project.category || "Web Application",
    description: project.description || "",
    status: project.status || "Active",
    progress: Number(project.progress ?? 0),
    deliveryDate: project.deadline
      ? String(project.deadline).slice(0, 10)
      : project.deliveryDate
        ? String(project.deliveryDate).slice(0, 10)
        : "",
    color: project.color || "#C2410C",
    initials:
      project.initials ||
      name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((word) => word[0]?.toUpperCase())
        .join(""),
  };
}

function extractList(response, key) {
  const data = response?.data ?? response;

  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.[key])) return data[key];
  if (Array.isArray(data?.data)) return data.data;

  return [];
}

export default function ManageProjects() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [tickets, setTickets] = useState([]);

  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ ...blankProject });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Fetch projects.
  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getProjects();
      setProjects(
        extractList(response, "projects").map(normalizeProject),
      );
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to load projects.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch tickets for project-level summary counts.
  const fetchTickets = useCallback(async () => {
    try {
      const response = await getTickets();
      setTickets(extractList(response, "tickets"));
    } catch (err) {
      console.error("Unable to load ticket summaries:", err);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
    fetchTickets();
  }, [fetchProjects, fetchTickets]);

  // Filter projects by name or category.
  const filteredProjects = projects.filter((project) =>
    `${project.name} ${project.category}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setMessage("");
    setError("");
  };

  const startCreate = () => {
    setEditingId(null);
    setForm({ ...blankProject });
    setMessage("");
    setError("");
    setShowForm(true);
  };

  const startEdit = (project) => {
    setEditingId(project.id);

    setForm({
      name: project.name,
      category: project.category,
      description: project.description,
      status: project.status,
      progress: project.progress,
      deliveryDate: project.deliveryDate,
      color: project.color,
      initials: project.initials,
    });

    setMessage("");
    setError("");
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm({ ...blankProject });
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submitting) return;

    setSubmitting(true);
    setError("");
    setMessage("");

    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      status: form.status,
      deadline: form.deliveryDate || null,
    };

    try {
      if (editingId) {
        await updateProject(editingId, payload);
        setMessage("Project updated successfully.");
      } else {
        await createProject(payload);
        setMessage("Project created successfully.");
      }

      closeForm();
      await fetchProjects();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to save project. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Open the project details page.
  const handleViewProject = (project) => {
    navigate(`/admin/projects/${project.id}`);
  };

  return (
    <div>
      <PageHeader
        eyebrow="Administration"
        title="Manage Projects"
        description="Manage client projects, view project summaries, and track related support tickets."
        action={
          <button
            type="button"
            onClick={startCreate}
            className="inline-flex items-center gap-2 rounded-xl bg-[#C2410C] px-4 py-3 text-sm font-semibold text-white hover:bg-orange-800"
          >
            <Plus size={17} />
            Add project
          </button>
        }
      />

      {(message || error) && (
        <div
          role="status"
          className={`mb-5 flex items-center gap-2 rounded-xl border p-4 text-sm ${
            error
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-emerald-200 bg-emerald-50 text-emerald-800"
          }`}
        >
          {error ? (
            <AlertCircle size={18} />
          ) : (
            <CheckCircle2 size={18} />
          )}

          <span>{error || message}</span>

          {error && (
            <button
              type="button"
              onClick={fetchProjects}
              className="ml-auto font-semibold underline"
            >
              Retry
            </button>
          )}
        </div>
      )}

      <ProjectStats projects={projects} />

      {showForm && (
        <ProjectForm
          form={form}
          editingId={editingId}
          onUpdateField={updateField}
          onSubmit={handleSubmit}
          onClose={closeForm}
          submitting={submitting}
        />
      )}

      <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
        <ProjectSearch
          search={search}
          onSearchChange={setSearch}
          resultCount={filteredProjects.length}
        />

        {loading ? (
          <div className="flex items-center justify-center gap-2 p-12 text-sm text-stone-500">
            <LoaderCircle size={18} className="animate-spin" />
            Loading projects...
          </div>
        ) : error && projects.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-sm text-stone-600">
              Projects could not be loaded.
            </p>

            <button
              type="button"
              onClick={fetchProjects}
              className="mt-3 rounded-lg bg-[#C2410C] px-4 py-2 text-sm font-semibold text-white"
            >
              Try again
            </button>
          </div>
        ) : (
          <ProjectList
            projects={filteredProjects}
            tickets={tickets}
            onEdit={startEdit}
            onView={handleViewProject}
          />
        )}
      </section>
    </div>
  );
}
