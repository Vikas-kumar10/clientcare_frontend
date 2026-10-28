
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  CalendarDays,
  Send,
} from "lucide-react";

import { createProject } from "../../api/projectApi";

const initialForm = {
  name: "",
  description: "",
  startDate: "",
  deadline: "",
};

export default function CreateProject() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const inputClass =
    "mt-2 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      formData.startDate &&
      formData.deadline &&
      formData.deadline < formData.startDate
    ) {
      setError("Project deadline cannot be before the start date.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        ...(formData.startDate && {
          startDate: formData.startDate,
        }),
        ...(formData.deadline && {
          deadline: formData.deadline,
        }),
      };

      const data = await createProject(payload);

      if (data?.success === false) {
        setError(data.message || "Unable to create project.");
        return;
      }

      setSuccess("Project created successfully!");

      setTimeout(() => {
        navigate("/client/projects");
      }, 800);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to create project. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (!loading) {
      navigate("/client/projects");
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Page Header */}
      <div>
        <button
          type="button"
          onClick={handleBack}
          disabled={loading}
          className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-stone-500 transition hover:text-orange-800 disabled:opacity-60"
        >
          <ArrowLeft size={17} />
          Back to Projects
        </button>

        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl">
          Create New Project
        </h1>

        <p className="mt-2 text-sm leading-6 text-stone-500">
          Provide your project details to get started with ClientCare.
        </p>
      </div>

      {/* Project Form */}
      <form
        onSubmit={handleSubmit}
        className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"
      >
        <div className="h-1.5 bg-[#C2410C]" />

        <div className="space-y-6 p-5 sm:p-8">
          {/* Project Name */}
          <div>
            <label
              htmlFor="name"
              className="text-sm font-semibold text-stone-700"
            >
              Project Name <span className="text-red-500">*</span>
            </label>

            <input
              id="name"
              name="name"
              type="text"
              required
              minLength={3}
              maxLength={100}
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. ClientCare Support Portal"
              className={inputClass}
            />
          </div>

          {/* Project Description */}
          <div>
            <label
              htmlFor="description"
              className="flex items-center gap-2 text-sm font-semibold text-stone-700"
            >
              <FileText size={16} />
              Project Description
            </label>

            <textarea
              id="description"
              name="description"
              maxLength={2000}
              rows={5}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your project and its purpose..."
              className={`${inputClass} resize-y`}
            />

            <p className="mt-1 text-right text-xs text-stone-400">
              {formData.description.length}/2000 characters
            </p>
          </div>

          {/* Start Date */}
          <div>
            <label
              htmlFor="startDate"
              className="flex items-center gap-2 text-sm font-semibold text-stone-700"
            >
              <CalendarDays size={16} />
              Start Date
            </label>

            <input
              id="startDate"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
              max={formData.deadline || undefined}
              className={inputClass}
            />
          </div>

          {/* Project Deadline */}
          <div>
            <label
              htmlFor="deadline"
              className="flex items-center gap-2 text-sm font-semibold text-stone-700"
            >
              <CalendarDays size={16} />
              Project Deadline
            </label>

            <input
              id="deadline"
              name="deadline"
              type="date"
              value={formData.deadline}
              onChange={handleChange}
              min={formData.startDate || undefined}
              className={inputClass}
            />
          </div>

          {/* Initial Project Status */}
          <div className="rounded-xl border border-orange-100 bg-orange-50/70 p-4">
            <p className="text-sm font-semibold text-stone-800">
              Initial Project Status
            </p>

            <p className="mt-1 text-sm font-medium text-orange-800">
              Planning
            </p>

            <p className="mt-1 text-xs text-stone-500">
              The server sets the initial status automatically.
            </p>
          </div>

          {/* Success Message */}
          {success && (
            <div
              role="status"
              className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
            >
              {success}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col-reverse gap-3 border-t border-stone-100 bg-stone-50/70 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="text-xs text-stone-500">
            Enter your project details to continue.
          </p>

          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleBack}
              disabled={loading}
              className="rounded-xl border border-stone-200 bg-white px-5 py-3 text-sm font-semibold text-stone-600 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading || Boolean(success)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C2410C] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#9A3412] focus:outline-none focus:ring-4 focus:ring-orange-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send size={17} />
              {loading ? "Creating Project..." : "Create Project"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
