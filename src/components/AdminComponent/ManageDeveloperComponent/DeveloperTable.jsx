import { Ban, CheckCircle2, Pencil } from "lucide-react";
import { EmptyState } from "../../ClientComponent/UI";

export default function DeveloperTable({ developers, onEdit, onToggleStatus }) {
  if (!developers.length) {
    return <EmptyState title="No developers found" description="Try another search or status filter." />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[700px] text-left">
        <thead className="border-b border-stone-100">
          <tr className="text-xs uppercase tracking-wider text-stone-400">
            <th className="px-5 py-4">Developer</th><th className="px-4 py-4">Team</th><th className="px-4 py-4">Status</th><th className="px-5 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100">
          {developers.map((developer) => (
            <tr key={developer.id} className="hover:bg-orange-50/30">
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stone-100 text-xs font-bold text-stone-700">{developer.initials}</div>
                  <div><p className="text-sm font-semibold text-stone-900">{developer.name}</p><p className="mt-1 text-xs text-stone-500">{developer.email}</p></div>
                </div>
              </td>
              <td className="px-4 py-4 text-sm text-stone-600">{developer.company || "—"}</td>
              <td className="px-4 py-4">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${developer.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />{developer.status}
                </span>
              </td>
              <td className="px-5 py-4">
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => onEdit(developer)} className="inline-flex items-center gap-1 rounded-lg border border-stone-200 px-2.5 py-2 text-xs font-semibold text-stone-700 hover:border-orange-300 hover:text-orange-800"><Pencil size={13} /> Edit</button>
                  <button type="button" onClick={() => onToggleStatus(developer)} className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-2 text-xs font-semibold ${developer.status === "Active" ? "border-rose-200 text-rose-700 hover:bg-rose-50" : "border-emerald-200 text-emerald-700 hover:bg-emerald-50"}`}>
                    {developer.status === "Active" ? <Ban size={13} /> : <CheckCircle2 size={13} />}{developer.status === "Active" ? "Suspend" : "Activate"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
