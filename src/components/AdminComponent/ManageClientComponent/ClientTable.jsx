
import {
  Pencil,
  Ban,
  CheckCircle2,
} from "lucide-react";

import { EmptyState } from "../../ClientComponent/UI";
import ClientStatusBadge from "./ClientStatusBadge";

export default function ClientTable({
  clients = [],
  onEdit,
  onToggleStatus,
}) {
  if (!clients.length) {
    return (
      <EmptyState
        title="No clients found"
        description="Try another search or status filter."
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[700px] text-left">
        <thead className="border-b border-stone-100">
          <tr className="text-xs uppercase tracking-wider text-stone-400">
            <th className="px-5 py-4">Client</th>
            <th className="px-4 py-4">Company</th>
            <th className="px-4 py-4">Status</th>
            <th className="px-5 py-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-stone-100">
          {clients.map((client) => (
            <tr
              key={client.id}
              className="hover:bg-orange-50/30"
            >
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-800">
                    {client.initials ||
                      client.name
                        ?.split(/\s+/)
                        .slice(0, 2)
                        .map((part) => part[0]?.toUpperCase())
                        .join("")}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-stone-900">
                      {client.name}
                    </p>
                    <p className="mt-1 text-xs text-stone-500">
                      {client.email}
                    </p>
                  </div>
                </div>
              </td>

              <td className="px-4 py-4 text-sm text-stone-600">
                {client.company || "—"}
              </td>

              <td className="px-4 py-4">
                <ClientStatusBadge status={client.status} />
              </td>

              <td className="px-5 py-4">
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(client)}
                    className="inline-flex items-center gap-1 rounded-lg border border-stone-200 px-2.5 py-2 text-xs font-semibold text-stone-700 hover:border-orange-300 hover:text-orange-800"
                  >
                    <Pencil size={13} />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => onToggleStatus(client)}
                    className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-2 text-xs font-semibold ${
                      client.status === "Active"
                        ? "border-rose-200 text-rose-700 hover:bg-rose-50"
                        : "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                    }`}
                  >
                    {client.status === "Active" ? (
                      <Ban size={13} />
                    ) : (
                      <CheckCircle2 size={13} />
                    )}

                    {client.status === "Active"
                      ? "Suspend"
                      : "Activate"}
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
