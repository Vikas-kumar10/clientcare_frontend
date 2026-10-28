
import { X } from "lucide-react";

export default function ClientForm({
  form,
  setForm,
  editingId,
  onSubmit,
  onClose,
}) {
  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  return (
    <form
      onSubmit={onSubmit}
      className="mb-6 rounded-2xl border border-orange-200 bg-white p-5 sm:p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-stone-900">
            {editingId ? "Edit client" : "Add client"}
          </h2>
          <p className="mt-1 text-sm text-stone-500">
            Enter the client's account details.
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

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold text-stone-700">
          Full name *
          <input
            required
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Client full name"
            className="mt-2 w-full rounded-xl border border-stone-200 px-3 py-3 font-normal outline-none focus:border-orange-500"
          />
        </label>

        <label className="text-sm font-semibold text-stone-700">
          Email address *
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="client@company.com"
            className="mt-2 w-full rounded-xl border border-stone-200 px-3 py-3 font-normal outline-none focus:border-orange-500"
          />
        </label>

        <label className="text-sm font-semibold text-stone-700 sm:col-span-2">
          Company / organization
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Company name"
            className="mt-2 w-full rounded-xl border border-stone-200 px-3 py-3 font-normal outline-none focus:border-orange-500"
          />
        </label>

        <label className="text-sm font-semibold text-stone-700 sm:col-span-2">
          Account status
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-stone-200 bg-white px-3 py-3 font-normal outline-none focus:border-orange-500 sm:max-w-sm"
          >
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
          </select>
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
          {editingId ? "Update client" : "Add client"}
        </button>
      </div>
    </form>
  );
}
