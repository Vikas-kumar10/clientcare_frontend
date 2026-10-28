
import ProjectCard from "./ProjectCard";
import { EmptyState } from "../UI";

export default function ProjectList({ projects = [], tickets = [] }) {
  if (!projects.length) {
    return (
      <div className="rounded-2xl border border-stone-200 bg-white">
        <EmptyState
          title="No projects found"
          description="Try another search term or select a different status."
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project._id || project.id}
          project={project}
          tickets={tickets}
        />
      ))}
    </div>
  );
}
