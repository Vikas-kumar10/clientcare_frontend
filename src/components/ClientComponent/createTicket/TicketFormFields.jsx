
import { Upload } from "lucide-react";

export default function TicketFormFields({
  projects,
  form,
  update,
  attempted,
  inputClass,
}) {
  return (
    <>
      {/* Project */}
      <div>
        <label htmlFor="projectId" className="text-sm font-semibold text-stone-700">
          Select project <span className="text-red-500">*</span>
        </label>

        <select
          id="projectId"
          value={form.projectId}
          onChange={(e) => update("projectId", e.target.value)}
          className={inputClass}
        >
          <option value="">Choose the affected project</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>

        {attempted && !form.projectId && (
          <p className="mt-1.5 text-xs text-red-600">
            Please select a project.
          </p>
        )}
      </div>

      {/* Title */}
      <div className="mt-5">
        <label htmlFor="title" className="text-sm font-semibold text-stone-700">
          Issue title <span className="text-red-500">*</span>
        </label>

        <input
          id="title"
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          placeholder="e.g. Payment successful but order not created"
          maxLength={120}
          className={inputClass}
        />

        <p className="mt-1.5 text-right text-xs text-stone-400">
          {form.title.length}/120
        </p>

        {attempted && !form.title.trim() && (
          <p className="text-xs text-red-600">
            Please enter an issue title.
          </p>
        )}
      </div>

      {/* Category and Priority */}
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="category" className="text-sm font-semibold text-stone-700">
            Issue category
          </label>

          <select
            id="category"
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
            className={inputClass}
          >
            <option>Bug / Technical Issue</option>
            <option>Payment</option>
            <option>Login / Authentication</option>
            <option>Performance</option>
            <option>Data & Reports</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="priority" className="text-sm font-semibold text-stone-700">
            Priority
          </label>

          <select
            id="priority"
            value={form.priority}
            onChange={(e) => update("priority", e.target.value)}
            className={inputClass}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Urgent</option>
          </select>
        </div>
      </div>

      {/* Description */}
      <div className="mt-5">
        <label htmlFor="description" className="text-sm font-semibold text-stone-700">
          Describe the issue <span className="text-red-500">*</span>
        </label>

        <textarea
          id="description"
          rows={6}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="What happened? What did you expect? When did the problem start?"
          maxLength={2000}
          className={`${inputClass} resize-y leading-6`}
        />

        <p className="mt-1.5 text-right text-xs text-stone-400">
          {form.description.length}/2000
        </p>

        {attempted && !form.description.trim() && (
          <p className="text-xs text-red-600">
            Please describe the issue.
          </p>
        )}
      </div>

      {/* Screenshot */}
      <div className="mt-5">
        <label className="text-sm font-semibold text-stone-700">
          Attach screenshot{" "}
          <span className="font-normal text-stone-400">
            (optional demo)
          </span>
        </label>

        <label className="mt-2 flex cursor-pointer flex-col items-center rounded-xl border border-dashed border-stone-300 bg-stone-50/60 px-4 py-7 text-center transition hover:border-orange-400 hover:bg-orange-50/40">
          <Upload size={23} className="text-stone-400" />

          <span className="mt-3 text-sm font-semibold text-stone-700">
            Choose a file
          </span>

          <span className="mt-1 text-xs text-stone-400">
            UI placeholder only · file will not be uploaded
          </span>

          <input
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (file) {
                window.alert(
                  `Demo only: ${file.name} was selected, not uploaded.`
                );
              }
            }}
          />
        </label>
      </div>
    </>
  );
}