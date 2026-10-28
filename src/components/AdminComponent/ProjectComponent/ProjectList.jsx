
import { EmptyState } from "../../ClientComponent/UI";
import ProjectCard from "./ProjectCard";

export default function ProjectList({
  projects = [],
  tickets = [],
  onEdit,
  onView,
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => {
            const projectTickets = tickets.filter((ticket) => {
              const ticketProjectId =
                ticket.project?._id || ticket.project;

              return (
                String(ticketProjectId) === String(project.id)
              );
            });

            const totalTickets = projectTickets.length;

            const openIssues = projectTickets.filter((ticket) =>
              ["Open", "Assigned", "In Progress"].includes(
                ticket.status,
              ),
            ).length;

            return (
              <ProjectCard
                key={project.id}
                project={{
                  ...project,
                  totalTickets,
                  openIssues,
                }}
                onEdit={onEdit}
                onView={onView}
              />
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="No projects found"
          description="Try another project name or create a new project."
        />
      )}
    </section>
  );
}
