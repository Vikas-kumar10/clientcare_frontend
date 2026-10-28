import { useEffect, useState } from "react";
import { UserRound, ShieldCheck } from "lucide-react";
import { getMyProfile, updateMyProfile } from "../../api/profileApi";
import DeveloperProfileForm from "../../components/DeveloperComponent/DeveloperProfileForm";

const initialForm = {
  phone: "",
  company: "",
  jobTitle: "",
  bio: "",
};

export default function DeveloperProfile() {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
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
        setError(err.response?.data?.message || "Unable to load your profile.");
      } finally {
        setPageLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const data = await updateMyProfile(formData);
      const updatedUser = data.user;

      setProfile(updatedUser);
      setFormData({
        phone: updatedUser.phone || "",
        company: updatedUser.company || "",
        jobTitle: updatedUser.jobTitle || "",
        bio: updatedUser.bio || "",
      });

      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...storedUser, ...updatedUser }),
      );

      setMessage("Profile updated successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update your profile.");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-orange-200 border-t-[#C2410C]" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-7">
      {/* Page heading */}
      <div>
        <p className="text-sm font-semibold text-orange-800">
          Developer Workspace
        </p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl">
          My Profile
        </h1>
        <p className="mt-2 text-sm text-stone-500">
          Manage your professional information and contact details.
        </p>
      </div>

      {/* Profile summary */}
      <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
        <div className="h-2 bg-[#C2410C]" />
        <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:p-8">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-800">
            <UserRound size={30} />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="truncate text-xl font-bold text-stone-900">
              {profile?.name || "Developer"}
            </h2>
            <p className="mt-1 break-all text-sm text-stone-500">
              {profile?.email}
            </p>
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold capitalize text-orange-800">
              <ShieldCheck size={14} />
              {profile?.role || "developer"}
            </span>
          </div>
        </div>
      </section>

      {/* Editable profile form */}
      <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-8">
        <div className="mb-6 border-b border-stone-100 pb-5">
          <h2 className="text-lg font-bold text-stone-900">
            Personal Information
          </h2>
          <p className="mt-1 text-sm text-stone-500">
            Update your details below. Your name and email are read-only.
          </p>
        </div>

        {message && (
          <div
            role="status"
            className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
          >
            {message}
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        <DeveloperProfileForm
          profile={profile}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </section>
    </div>
  );
}
