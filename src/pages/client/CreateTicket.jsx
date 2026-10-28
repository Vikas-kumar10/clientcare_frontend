
import { useEffect, useState } from "react";
import { PageHeader } from "../../components/ClientComponent/UI";
import TicketForm from "../../components/ClientComponent/createTicket/TicketForm";
import TicketSidebar from "../../components/ClientComponent/createTicket/TicketSidebar";
import TicketSuccess from "../../components/ClientComponent/createTicket/TicketSuccess";

import { getProjects } from "../../api/projectApi";
import { createTicket } from "../../api/ticketApi";

const initialForm = {
  projectId: "",
  title: "",
  category: "Bug / Technical Issue",
  priority: "Medium",
  description: "",
};

export default function CreateTicket() {
  const [form, setForm] = useState(initialForm);
  const [projects, setProjects] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Fetch projects from the backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoadingProjects(true);
        setError("");

        const response = await getProjects();

        // Supports common API response formats
        const projectList = Array.isArray(response)
          ? response
          : response.projects || response.data || [];

        setProjects(
          projectList.map((project) => ({
            ...project,
            id: project._id || project.id,
          }))
        );
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load projects. Please try again."
        );
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchProjects();
  }, []);

  const update = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setSubmitted(false);
    setError("");
  };

  // Create ticket through the backend API
  const handleSubmit = async (event) => {
    event.preventDefault();
    setAttempted(true);
    setError("");

    if (
      !form.projectId ||
      !form.title.trim() ||
      !form.description.trim()
    ) {
      return;
    }

    try {
      setSubmitting(true);

      await createTicket({
        title: form.title.trim(),
        description: form.description.trim(),
        project: form.projectId,
        priority: form.priority,
      });

      // Show success only after the API succeeds
      setSubmitted(true);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to create ticket. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateAnother = () => {
    setForm(initialForm);
    setSubmitted(false);
    setAttempted(false);
    setError("");
  };

  if (submitted) {
    return (
      <TicketSuccess
        form={form}
        projects={projects}
        onCreateAnother={handleCreateAnother}
      />
    );
  }

  return (
    <div>
      <PageHeader
        eyebrow="Support center"
        title="Create a support ticket"
        description="Tell us what went wrong. Add enough detail so the support team can understand the issue."
      />

      {error && (
        <div
          role="alert"
          className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {loadingProjects ? (
        <div className="rounded-xl border border-stone-200 bg-white p-6 text-sm text-stone-600">
          Loading your projects...
        </div>
      ) : projects.length === 0 ? (
        <div className="rounded-xl border border-stone-200 bg-white p-6">
          <p className="font-medium text-stone-800">
            No projects available
          </p>
          <p className="mt-1 text-sm text-stone-600">
            You need an assigned project before creating a support ticket.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_310px]">
          <TicketForm
            form={form}
            update={update}
            attempted={attempted}
            handleSubmit={handleSubmit}
            projects={projects}
            submitting={submitting}
          />

          <TicketSidebar />
        </div>
      )}
    </div>
  );
}
