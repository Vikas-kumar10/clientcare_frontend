
import { Link } from "react-router-dom";
import {
  ArrowRight,
  FolderKanban,
  Ticket,
  Users,
} from "lucide-react";
import { SectionHeading } from "../../ClientComponent/UI";

const actions = [
  {
    title: "Review new tickets",
    description: "Check client-reported issues and assign developers.",
    to: "/admin/tickets",
    icon: Ticket,
  },
  {
    title: "Manage projects",
    description: "Create projects and update project information.",
    to: "/admin/projects",
    icon: FolderKanban,
  },
  {
    title: "Manage accounts",
    description: "Review client and developer accounts.",
    to: "/admin/users",
    icon: Users,
  },
];

export default function QuickActions() {
  return (
    <section className="mt-8">
      <SectionHeading title="Quick actions" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {actions.map(({ title, description, to, icon: Icon }) => (
          <Link
            key={title}
            to={to}
            className="group rounded-2xl border border-stone-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-700">
                <Icon size={21} />
              </span>

              <ArrowRight
                size={18}
                className="text-stone-400 transition group-hover:text-orange-700"
              />
            </div>

            <h3 className="mt-4 font-bold text-stone-900">{title}</h3>

            <p className="mt-2 text-sm leading-6 text-stone-500">
              {description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
