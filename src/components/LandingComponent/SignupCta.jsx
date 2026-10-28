import { Link } from "react-router-dom";
import { ArrowRight, Code2, Users } from "lucide-react";

const roles = [
  {
    title: "I'm a Client",
    description: "Submit issues and follow project support.",
    link: "/signup?role=client",
    linkText: "Sign up as client",
    icon: Users,
    cardBg: "bg-white",
  },
  {
    title: "I'm a Developer",
    description: "View assigned tickets and update their progress.",
    link: "/signup?role=developer",
    linkText: "Sign up as developer",
    icon: Code2,
    cardBg: "bg-orange-100",
  },
];

export default function SignupCta() {
  return (
    <section className="px-5 pb-20 sm:px-8 sm:pb-24">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#292524] px-6 py-12 text-white sm:px-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-300">
              Get started with ClientCare
            </p>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
              The right support starts here.
            </h2>
            <p className="mt-4 max-w-xl leading-7 text-stone-300">
              Create your account based on your role and get connected to the
              right workflow.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {roles.map((role) => {
              const Icon = role.icon;

              return (
                <Link
                  key={role.link}
                  to={role.link}
                  className={`group rounded-2xl p-6 text-[#292524] transition hover:-translate-y-1 ${role.cardBg}`}
                >
                  <Icon size={27} className="text-[#C2410C]" />
                  <h3 className="mt-4 text-xl font-bold">{role.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600">
                    {role.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#C2410C]">
                    {role.linkText}
                    <ArrowRight
                      size={16}
                      className="transition group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}