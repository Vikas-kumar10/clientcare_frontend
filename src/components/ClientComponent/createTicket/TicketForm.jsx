
import { Link } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";
import IssueInformation from "./IssueInformation";

export default function TicketForm({
  form,
  update,
  attempted,
  handleSubmit,
  projects,
  submitting = false,
}) {
  const inputClass =
    "mt-2 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-stone-200 bg-white"
      noValidate
    >
      <IssueInformation
        projects={projects}
        form={form}
        update={update}
        attempted={attempted}
        inputClass={inputClass}
      />

      <div className="flex flex-col-reverse justify-between gap-3 bg-stone-50/70 p-5 sm:flex-row sm:items-center sm:px-7">
        <Link
          to="/client/tickets"
          className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-stone-600 hover:bg-stone-100"
        >
          <ArrowLeft size={16} />
          Cancel
        </Link>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C2410C] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send size={16} />
          {submitting ? "Creating ticket..." : "Submit ticket"}
        </button>
      </div>
    </form>
  );
}
