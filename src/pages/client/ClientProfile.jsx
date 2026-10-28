import { useEffect, useState } from "react";
import {
  UserRound,
  Mail,
  Phone,
  Building2,
  BriefcaseBusiness,
  FileText,
  Save,
  LoaderCircle,
} from "lucide-react";
import { getMyProfile, updateMyProfile } from "../../api/profileApi";

export default function ClientProfile() {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    phone: "",
    company: "",
    jobTitle: "",
    bio: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getMyProfile();
        const user = data.user;

        setProfile(user);
        setFormData({
          phone: user.phone || "",
          company: user.company || "",
          jobTitle: user.jobTitle || "",
          bio: user.bio || "",
        });
      } catch (err) {
        setError(
          err.response?.data?.message || "Unable to load your profile."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  function handleChange(event) {
    setFormData((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));

    setError("");
    setSuccess("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      setSaving(true);

      const data = await updateMyProfile(formData);

      setProfile(data.user);
      setFormData({
        phone: data.user.phone || "",
        company: data.user.company || "",
        jobTitle: data.user.jobTitle || "",
        bio: data.user.bio || "",
      });

      // Keep the stored display data in sync
      const storedUser = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      localStorage.setItem(
        "user",
        JSON.stringify({ ...storedUser, ...data.user })
      );

      setSuccess("Your profile has been updated successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to update your profile."
      );
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-[#292524] outline-none transition focus:border-[#C2410C] focus:ring-4 focus:ring-orange-100";

  const readOnlyClass =
    "w-full cursor-not-allowed rounded-xl border border-stone-200 bg-stone-100 px-4 py-3 text-sm text-stone-500";

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center gap-2 text-stone-500">
        <LoaderCircle className="animate-spin" size={20} />
        Loading profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
        {error || "Profile could not be loaded."}
      </div>
    );
  }

  const initials = (profile.name || "Client")
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Page heading */}
      <div>
        <p className="text-sm font-semibold text-[#C2410C]">
          Account settings
        </p>
        <h1 className="mt-1 text-2xl font-extrabold text-[#292524] sm:text-3xl">
          My Profile
        </h1>
        <p className="mt-2 text-sm text-stone-500">
          Manage your contact and professional information.
        </p>
      </div>

      {/* Profile summary */}
      <section className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-xl font-extrabold text-[#C2410C]">
          {initials}
        </div>

        <div className="min-w-0">
          <h2 className="truncate text-lg font-bold text-[#292524]">
            {profile.name}
          </h2>
          <p className="truncate text-sm text-stone-500">
            {profile.email}
          </p>
          <span className="mt-2 inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold capitalize text-[#C2410C]">
            {profile.role} account
          </span>
        </div>
      </section>

      {/* Profile form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-7"
      >
        <div className="mb-6">
          <h2 className="text-lg font-bold text-[#292524]">
            Personal information
          </h2>
          <p className="mt-1 text-sm text-stone-500">
            Your name and email cannot be changed here.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {/* Name: read only */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-stone-700">
              <UserRound size={16} />
              Full name
            </label>
            <input
              value={profile.name || ""}
              readOnly
              className={readOnlyClass}
            />
          </div>

          {/* Email: read only */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-stone-700">
              <Mail size={16} />
              Email address
            </label>
            <input
              type="email"
              value={profile.email || ""}
              readOnly
              className={readOnlyClass}
            />
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="profile-phone"
              className="mb-2 flex items-center gap-2 text-sm font-semibold text-stone-700"
            >
              <Phone size={16} />
              Phone number
            </label>
            <input
              id="profile-phone"
              name="phone"
              type="tel"
              maxLength={20}
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Company */}
          <div>
            <label
              htmlFor="profile-company"
              className="mb-2 flex items-center gap-2 text-sm font-semibold text-stone-700"
            >
              <Building2 size={16} />
              Company name
            </label>
            <input
              id="profile-company"
              name="company"
              type="text"
              maxLength={100}
              placeholder="Enter company name"
              value={formData.company}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Job title */}
          <div className="sm:col-span-2">
            <label
              htmlFor="profile-jobTitle"
              className="mb-2 flex items-center gap-2 text-sm font-semibold text-stone-700"
            >
              <BriefcaseBusiness size={16} />
              Job title
            </label>
            <input
              id="profile-jobTitle"
              name="jobTitle"
              type="text"
              maxLength={100}
              placeholder="e.g. Project Manager"
              value={formData.jobTitle}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Bio */}
          <div className="sm:col-span-2">
            <label
              htmlFor="profile-bio"
              className="mb-2 flex items-center gap-2 text-sm font-semibold text-stone-700"
            >
              <FileText size={16} />
              About me
            </label>
            <textarea
              id="profile-bio"
              name="bio"
              rows={4}
              maxLength={500}
              placeholder="Tell us a little about yourself..."
              value={formData.bio}
              onChange={handleChange}
              className={`${inputClass} resize-y`}
            />
            <p className="mt-1 text-right text-xs text-stone-400">
              {formData.bio.length}/500
            </p>
          </div>
        </div>

        {error && (
          <p role="alert" className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        {success && (
          <p role="status" className="mt-5 rounded-xl bg-green-50 p-3 text-sm text-green-700">
            {success}
          </p>
        )}

        <div className="mt-6 flex justify-end border-t border-stone-100 pt-5">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C2410C] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#9A3412] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={17} />
            {saving ? "Saving changes..." : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}