import { SectionHeading } from "./UI.jsx";
import { ProjectCard } from "./TicketComponents";

export default function ProjectsSection({ projects }) {
  return (
    <section className="mt-8">
      <SectionHeading
        title="Your projects"
        link="View projects"
        to="/client/projects"
      />

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.slice(0, 3).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-2xl border border-stone-200 bg-white p-6 text-sm text-stone-500">
          No projects available.
        </div>
      )}
    </section>
  );
}