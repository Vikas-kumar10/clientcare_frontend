import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Landing and Authentication Pages
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

// Client Dashboard
import ClientLayout from "./components/ClientComponent/ClientLayout";
import Dashboard from "./pages/client/Dashboard";
import MyProjects from "./pages/client/MyProjects";
import CreateTicket from "./pages/client/CreateTicket";
import MyTickets from "./pages/client/MyTickets";
import TicketDetails from "./pages/client/TicketDetails";
import ClientProfile from "./pages/client/ClientProfile";
import CreateProject from "./pages/client/CreateProject";

// Admin Dashboard
import AdminLayout from "./components/AdminComponent/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AllTickets from "./pages/admin/AllTickets";
import AdminTicketDetails from "./pages/admin/TicketDetailsAdmin";
import ManageProjects from "./pages/admin/ManageProjects";
import ManageClients from "./pages/admin/ManageClients";
import ManageDevelopers from "./pages/admin/ManageDevelopers";
import ActivityLog from "./pages/admin/ActivityLog";
import AdminNotifications from "./pages/admin/AdminNotifications";
import AdminSettings from "./pages/admin/AdminSettings";
import ProjectDetails from "./pages/admin/ProjectDetails";
import TicketDetailsAdmin from "./pages/admin/TicketDetailsAdmin";

// Developer Dashboard
import DeveloperLayout from "./components/DeveloperComponent/DeveloperLayout";
import DeveloperDashboard from "./pages/developer/DeveloperDashboard";
import AssignedTickets from "./pages/developer/AssignedTickets";
import DeveloperTicketDetails from "./pages/developer/TicketDetails";
import DeveloperProfile from "./pages/developer/DeveloperProfile";

function RequireAuth({ roles, children }) {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={roles?.includes("admin") ? "/admin/login" : "/login"} replace />;
  }

  if (roles && !roles.includes(role)) {
    return <Navigate to={`/${role}`} replace />;
  }

  return children;
}

export default function App() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin/login" element={<LoginPage adminOnly />} />

      {/* Client Routes */}
      <Route path="/client" element={<RequireAuth roles={["client"]}><ClientLayout /></RequireAuth>}>
        <Route index element={<Dashboard />} />
        <Route path="projects" element={<MyProjects />} />
        <Route path="create-project" element={<CreateProject />} />
        <Route path="create-ticket" element={<CreateTicket />} />
        <Route path="tickets" element={<MyTickets />} />
        <Route path="tickets/:ticketId" element={<TicketDetails />} />
        <Route path="/client/profile" element={<ClientProfile />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<RequireAuth roles={["admin"]}><AdminLayout /></RequireAuth>}>
        <Route index element={<AdminDashboard />} />
        <Route path="tickets" element={<AllTickets />} />
        <Route path="tickets/:ticketId" element={<AdminTicketDetails />} />
        <Route path="projects/:projectId" element={<ProjectDetails />} />
        <Route path="projects" element={<ManageProjects />} />
        <Route path="clients" element={<ManageClients />} />
        <Route path="developers" element={<ManageDevelopers />} />
        <Route path="activity" element={<ActivityLog />} />
        <Route path="notifications" element={<AdminNotifications />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="/admin/tickets/:ticketId" element={<TicketDetailsAdmin />} />
        
      </Route>

      {/* Developer Routes */}
      <Route path="/developer" element={<RequireAuth roles={["developer"]}><DeveloperLayout /></RequireAuth>}>
        <Route index element={<DeveloperDashboard />} />
        <Route path="tickets" element={<AssignedTickets />} />
        <Route path="tickets/:ticketId" element={<DeveloperTicketDetails />} />
        <Route path="profile" element={<DeveloperProfile />} />
      </Route>

      {/* Unknown URLs */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
