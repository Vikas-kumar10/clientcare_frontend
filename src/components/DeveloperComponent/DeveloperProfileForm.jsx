
import { UserRound, Mail, Phone, Building2, BriefcaseBusiness, FileText, Save, LoaderCircle } from "lucide-react";

export default function DeveloperProfileForm({
  profile,
  formData,
  setFormData,
  onSubmit,
  loading,
}) {
  const inputClass =
    "mt-2 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100";

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        {/* Name - Read only */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-stone-700">
            <UserRound size={16} /> Full Name
          </label>
          <input
            value={profile?.name || ""}
            readOnly
            className={`${inputClass} cursor-not-allowed bg-stone-50`}
          />
          <p className="mt-1 text-xs text-stone-400">Name cannot be changed.</p>
        </div>

        {/* Email - Read only */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-stone-700">
            <Mail size={16} /> Email Address
          </label>
          <input
            type="email"
            value={profile?.email || ""}
            readOnly
            className={`${inputClass} cursor-not-allowed bg-stone-50`}
          />
          <p className="mt-1 text-xs text-stone-400">Email cannot be changed.</p>
        </div>

        {/* Phone */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-stone-700">
            <Phone size={16} /> Phone Number
          </label>
          <input
            type="tel"
            maxLength={20}
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            placeholder="Enter phone number"
            className={inputClass}
          />
        </div>

        {/* Company */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-stone-700">
            <Building2 size={16} /> Company
          </label>
          <input
            maxLength={100}
            value={formData.company}
            onChange={(e) =>
              setFormData({ ...formData, company: e.target.value })
            }
            placeholder="Enter company name"
            className={inputClass}
          />
        </div>

        {/* Job Title */}
        <div className="sm:col-span-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-stone-700">
            <BriefcaseBusiness size={16} /> Job Title
          </label>
          <input
            maxLength={100}
            value={formData.jobTitle}
            onChange={(e) =>
              setFormData({ ...formData, jobTitle: e.target.value })
            }
            placeholder="e.g. Full Stack Developer"
            className={inputClass}
          />
        </div>

        {/* Bio */}
        <div className="sm:col-span-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-stone-700">
            <FileText size={16} /> About Me
          </label>
          <textarea
            rows={4}
            maxLength={500}
            value={formData.bio}
            onChange={(e) =>
              setFormData({ ...formData, bio: e.target.value })
            }
            placeholder="Write a short introduction about yourself..."
            className={`${inputClass} resize-y`}
          />
          <p className="mt-1 text-right text-xs text-stone-400">
            {formData.bio.length}/500 characters
          </p>
        </div>
      </div>

      <div className="flex justify-end border-t border-stone-100 pt-5">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C2410C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#9A3412] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <LoaderCircle size={17} className="animate-spin" />
          ) : (
            <Save size={17} />
          )}
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
