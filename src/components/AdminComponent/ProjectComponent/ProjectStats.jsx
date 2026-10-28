const statsConfig = [
  { label: "Total projects", key: "total" },
  { label: "Active", key: "active" },
  { label: "Completed", key: "completed" },
];

export default function ProjectStats({ projects = [] }) {
  const stats = {
    total: projects.length,
    active: projects.filter((project) => project.status === "Active").length,
    completed: projects.filter(
      (project) => project.status === "Completed"
    ).length,
  };

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
      {statsConfig.map((item) => (
        <div
          key={item.key}
          className="rounded-2xl border border-stone-200 bg-white p-5"
        >
          <p className="text-sm text-stone-500">{item.label}</p>
          <p className="mt-2 text-3xl font-bold text-stone-900">
            {stats[item.key]}
          </p>
        </div>
      ))}
    </div>
  );
}