
// import { Link } from "react-router-dom";
// import { Ticket } from "lucide-react";

// import { tickets, activity } from "../../data/mockData";
// import { PageHeader } from "../../components/ClientComponent/UI";

// import DashboardStats from "../../components/AdminComponent/DashboardComponent/DashboardStats";
// import RecentTickets from "../../components/AdminComponent/DashboardComponent/RecentTickets";
// import TicketStatusOverview from "../../components/AdminComponent/DashboardComponent/TicketStatusOverview";
// import QuickActions from "../../components/AdminComponent/DashboardComponent/QuickActions";
// import RecentActivity from "../../components/AdminComponent/DashboardComponent/RecentActivity";

// export default function AdminDashboard() {
//   return (
//     <div>
//       <PageHeader
//         eyebrow="Administration overview"
//         title="Admin Dashboard"
//         description="Monitor client issues, assign developers and keep support work moving."
//         action={
//           <Link
//             to="/admin/tickets"
//             className="inline-flex items-center gap-2 rounded-xl bg-[#C2410C] px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-800"
//           >
//             <Ticket size={17} />
//             Review tickets
//           </Link>
//         }
//       />

//       <DashboardStats tickets={tickets} />

//       <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
//         <RecentTickets tickets={tickets} />

//         <TicketStatusOverview tickets={tickets} />
//       </section>

//       <QuickActions />

//       <RecentActivity activity={activity} />
//     </div>
//   );
// }




import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Ticket } from "lucide-react";

import { getTickets } from "../../api/ticketApi";
import api from "../../api/axios";

import { PageHeader } from "../../components/ClientComponent/UI";

import DashboardStats from "../../components/AdminComponent/DashboardComponent/DashboardStats";
import RecentTickets from "../../components/AdminComponent/DashboardComponent/RecentTickets";
import TicketStatusOverview from "../../components/AdminComponent/DashboardComponent/TicketStatusOverview";
import QuickActions from "../../components/AdminComponent/DashboardComponent/QuickActions";
import RecentActivity from "../../components/AdminComponent/DashboardComponent/RecentActivity";

function getArray(response, key) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.[key])) return response[key];
  if (Array.isArray(response?.data)) return response.data;
  return [];
}

export default function AdminDashboard() {
  const [tickets, setTickets] = useState([]);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activityError, setActivityError] = useState("");

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    setError("");
    setActivityError("");

    try {
      const ticketResponse = await getTickets();
      setTickets(getArray(ticketResponse, "tickets"));
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load dashboard tickets."
      );
    }

    // Activity is loaded separately so an activity API failure
    // does not prevent the ticket dashboard from working.
    try {
      const activityResponse = await api.get("/activity");
      setActivity(getArray(activityResponse.data, "activity"));
    } catch (err) {
      setActivity([]);
      setActivityError(
        err.response?.data?.message ||
          "Activity could not be loaded."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return (
    <div>
      <PageHeader
        eyebrow="Administration overview"
        title="Admin Dashboard"
        description="Monitor client issues, assign developers and keep support work moving."
        action={
          <Link
            to="/admin/tickets"
            className="inline-flex items-center gap-2 rounded-xl bg-[#C2410C] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#9A3412]"
          >
            <Ticket size={17} />
            Review tickets
          </Link>
        }
      />

      {loading ? (
        <div className="rounded-2xl border border-stone-200 bg-white p-8 text-center text-sm text-stone-600">
          Loading admin dashboard...
        </div>
      ) : error ? (
        <div
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 p-5"
        >
          <p className="text-sm text-red-700">{error}</p>
          <button
            type="button"
            onClick={fetchDashboardData}
            className="mt-3 text-sm font-semibold text-red-800 underline"
          >
            Try again
          </button>
        </div>
      ) : (
        <>
          <DashboardStats tickets={tickets} />

          <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
            <RecentTickets tickets={tickets} />
            <TicketStatusOverview tickets={tickets} />
          </section>

          <QuickActions />

          {activityError && (
            <p className="mt-6 text-sm text-amber-700">
              {activityError} Check your backend activity route.
            </p>
          )}

          <RecentActivity activity={activity} />
        </>
      )}
    </div>
  );
}
