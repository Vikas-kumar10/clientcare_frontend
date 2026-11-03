// import { Link } from "react-router-dom";
// import { ArrowRight, Code2, Users } from "lucide-react";

// const roles = [
//   {
//     title: "I'm a Client",
//     description: "Submit issues and follow project support.",
//     link: "/signup?role=client",
//     linkText: "Sign up as client",
//     icon: Users,
//     cardBg: "bg-white",
//   },
//   {
//     title: "I'm a Developer",
//     description: "View assigned tickets and update their progress.",
//     link: "/signup?role=developer",
//     linkText: "Sign up as developer",
//     icon: Code2,
//     cardBg: "bg-orange-100",
//   },
// ];

// export default function SignupCta() {
//   return (
//     <section className="px-5 pb-20 sm:px-8 sm:pb-24">
//       <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#292524] px-6 py-12 text-white sm:px-12 sm:py-16">
//         <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
//           <div>
//             <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-300">
//               Get started with ClientCare
//             </p>
//             <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
//               The right support starts here.
//             </h2>
//             <p className="mt-4 max-w-xl leading-7 text-stone-300">
//               Create your account based on your role and get connected to the
//               right workflow.
//             </p>
//           </div>

//           <div className="grid gap-4 sm:grid-cols-2">
//             {roles.map((role) => {
//               const Icon = role.icon;

//               return (
//                 <Link
//                   key={role.link}
//                   to={role.link}
//                   className={`group rounded-2xl p-6 text-[#292524] transition hover:-translate-y-1 ${role.cardBg}`}
//                 >
//                   <Icon size={27} className="text-[#C2410C]" />
//                   <h3 className="mt-4 text-xl font-bold">{role.title}</h3>
//                   <p className="mt-2 text-sm leading-6 text-stone-600">
//                     {role.description}
//                   </p>
//                   <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#C2410C]">
//                     {role.linkText}
//                     <ArrowRight
//                       size={16}
//                       className="transition group-hover:translate-x-1"
//                     />
//                   </span>
//                 </Link>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


import { Link } from "react-router-dom";
import { ArrowRight, Code2, Users } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

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
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#292524] px-5 py-10 text-white sm:px-8 sm:py-14 lg:px-12 lg:py-16">

        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">

          {/* CTA Content */}
          <div className="text-center lg:text-left">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-300 sm:text-sm">
              Get started with ClientCare
            </p>

            <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">
              The right support starts here.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-300 sm:text-base lg:mx-0">
              Create your account based on your role and get connected to the
              right workflow.
            </p>
          </div>

          {/* Role Cards */}
          
{/* Role Cards */}
<div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
  {roles.map((role, index) => {
    const Icon = role.icon;

    return (
      <motion.div
        key={role.link}
        animate={
          shouldReduceMotion ? { y: 0 } : { y: [0, -12, 0] }
        }
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.7,
        }}
        whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
        className="h-full min-w-0"
      >
        <Link
          to={role.link}
          className={`group relative flex h-full min-h-[230px] flex-col overflow-hidden rounded-2xl p-5 text-[#292524] shadow-lg transition-shadow duration-300 hover:shadow-2xl sm:p-6 ${role.cardBg}`}
        >
          {/* Background Icon */}
          <Icon
            size={150}
            strokeWidth={1}
            aria-hidden="true"
            className="pointer-events-none absolute -right-5 -bottom-7 rotate-[-15deg] text-[#C2410C]/[0.08] transition-all duration-500 group-hover:scale-110 group-hover:rotate-0 group-hover:text-[#C2410C]/[0.13]"
          />

          {/* Foreground Content */}
          <div className="relative z-10 flex h-full flex-col">
            <Icon
              size={28}
              strokeWidth={2}
              className="text-[#C2410C] transition-transform duration-300 group-hover:scale-110"
            />

            <h3 className="mt-4 text-lg font-bold sm:text-xl">
              {role.title}
            </h3>

            <p className="mt-2 flex-1 text-sm leading-6 text-stone-600">
              {role.description}
            </p>

            <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#C2410C]">
              {role.linkText}

              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </div>
        </Link>
      </motion.div>
    );
  })}
</div>

        </div>
      </div>
    </section>
  );
}
