import { CheckCircle2, X } from "lucide-react";

const inputClass =
  "mt-2 w-full rounded-xl border border-stone-200 px-3 py-3 font-normal outline-none focus:border-orange-500";

export default function ProjectForm({
  form,
  editingId,
  message,
  onUpdateField,
  onSubmit,
  onClose,
}) {
  return (
    <>
      {message && (
        <div className="mb-5 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
          <CheckCircle2 size={18} />
          <span>{message}</span>
          <span className="text-xs text-emerald-700">
            (Not saved to database)
          </span>
        </div>
      )}

      <form
        onSubmit={onSubmit}
        className="mb-6 rounded-2xl border border-orange-200 bg-white p-5 shadow-sm sm:p-6"
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-stone-900">
              {editingId ? "Edit project" : "Create project"}
            </h2>
            <p className="mt-1 text-sm text-stone-500">
              Enter the project information below.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close form"
            className="rounded-lg p-2 text-stone-500 hover:bg-stone-100"
          >
            <X size={19} />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
          <label className="text-sm font-semibold text-stone-700">
            Project name *
            <input
              required
              value={form.name}
              onChange={(e) => onUpdateField("name", e.target.value)}
              placeholder="e.g. E-commerce website"
              className={inputClass}
            />
          </label>

          <label className="text-sm font-semibold text-stone-700">
            Category
            <select
              value={form.category}
              onChange={(e) => onUpdateField("category", e.target.value)}
              className={`${inputClass} bg-white`}
            >
              <option>Web Application</option>
              <option>Mobile Application</option>
              <option>E-commerce</option>
              <option>CRM / ERP</option>
              <option>Website</option>
              <option>Other</option>
            </select>
          </label>

          <label className="text-sm font-semibold text-stone-700 md:col-span-2">
            Description *
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) =>
                onUpdateField("description", e.target.value)
              }
              placeholder="Briefly describe the project..."
              className={inputClass}
            />
          </label>

          <label className="text-sm font-semibold text-stone-700">
            Project status
            <select
              value={form.status}
              onChange={(e) => onUpdateField("status", e.target.value)}
              className={`${inputClass} bg-white`}
            >
              <option>Active</option>
              <option>Completed</option>
              <option>On Hold</option>
            </select>
          </label>

          <label className="text-sm font-semibold text-stone-700">
            Delivery date
            <input
              type="date"
              value={form.deliveryDate}
              onChange={(e) =>
                onUpdateField("deliveryDate", e.target.value)
              }
              className={inputClass}
            />
          </label>

          <label className="text-sm font-semibold text-stone-700">
            Progress: {form.progress}%
            <input
              type="range"
              min="0"
              max="100"
              value={form.progress}
              onChange={(e) =>
                onUpdateField("progress", Number(e.target.value))
              }
              className="mt-4 block w-full accent-orange-700"
            />
          </label>

          <label className="text-sm font-semibold text-stone-700">
            Project color
            <div className="mt-2 flex items-center gap-3">
              <input
                type="color"
                value={form.color}
                onChange={(e) => onUpdateField("color", e.target.value)}
                className="h-11 w-14 cursor-pointer rounded-lg border border-stone-200 p-1"
              />
              <span className="text-sm font-normal text-stone-500">
                {form.color}
              </span>
            </div>
          </label>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-stone-200 px-5 py-3 text-sm font-semibold text-stone-600 hover:bg-stone-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-xl bg-[#C2410C] px-5 py-3 text-sm font-semibold text-white hover:bg-orange-800"
          >
            {editingId ? "Update project" : "Create project"}
          </button>
        </div>
      </form>
    </>
  );
}