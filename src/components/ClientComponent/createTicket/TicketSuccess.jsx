import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

export default function TicketSuccess({
  form,
  projects,
  onCreateAnother,
}) {
  const selectedProject = projects.find(
    (project) => String(project.id) === String(form.projectId)
  );

  return (
    <div className="mx-auto max-w-2xl py-10">
      <div className="rounded-3xl border border-stone-200 bg-white p-7 text-center shadow-sm sm:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
          <CheckCircle2 size={34} />
        </div>

        <p className="mt-5 text-xs font-bold uppercase tracking-widest text-emerald-700">
          Demo submission successful
        </p>

        <h1 className="mt-2 text-2xl font-bold text-stone-900">
          Your form is ready!
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-stone-500">
          This is a static UI preview. No ticket has been saved and no real
          support team has been notified.
        </p>

        <div className="mt-6 rounded-2xl bg-stone-50 p-5 text-left">
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
            Form summary
          </p>

          <h2 className="mt-2 font-bold text-stone-900">
            {form.title}
          </h2>

          <p className="mt-1 text-sm text-stone-500">
            {selectedProject?.name || "Selected project"}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-800">
              {form.priority} priority
            </span>

            <span className="rounded-full bg-stone-200 px-3 py-1 text-xs text-stone-700">
              {form.category}
            </span>
          </div>
        </div>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/client/tickets"
            className="rounded-xl bg-[#C2410C] px-5 py-3 text-sm font-semibold text-white hover:bg-orange-800"
          >
            View my tickets
          </Link>

          <button
            type="button"
            onClick={onCreateAnother}
            className="rounded-xl border border-stone-200 px-5 py-3 text-sm font-semibold text-stone-700 hover:bg-stone-50"
          >
            Create another
          </button>
        </div>
      </div>
    </div>
  );
}