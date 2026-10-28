
export default function ProjectStats({ projects }) {
  const stats = [
    { label: "Total projects", value: projects.length },
    {
      label: "Active projects",
      value: projects.filter((p) => p.status === "Active").length,
    },
    {
      label: "Completed",
      value: projects.filter((p) => p.status === "Completed").length,
    },
  ];

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-stone-200 bg-white p-5"
        >
          <p className="text-sm text-stone-500">{item.label}</p>
          <p className="mt-2 text-3xl font-bold text-stone-900">
            {String(item.value).padStart(2, "0")}
          </p>
        </div>
      ))}
    </div>
  );
}
