const STORAGE_KEY = "clientcare_developer_tickets";
export const CURRENT_DEVELOPER_ID = "USR-003";

const initialTickets = [
  {
    id: "TKT-101",
    title: "Checkout page is not working",
    description:
      "The checkout button does not complete the order. After payment, the page keeps loading.",
    projectName: "E-commerce Website",
    clientName: "Rahul Sharma",
    clientEmail: "rahul@brighttech.com",
    assignedToId: "USR-003",
    assignedToName: "Amit Kumar",
    priority: "High",
    status: "In Progress",
    category: "Bug",
    createdAt: "2026-10-20",
    resolutionNote: "",
    comments: [
      {
        author: "Admin",
        message: "Please investigate the checkout issue.",
        date: "2026-10-20",
      },
    ],
  },
  {
    id: "TKT-102",
    title: "Login page shows an error",
    description:
      "The client receives an error message after entering valid login credentials.",
    projectName: "CRM Application",
    clientName: "Priya Singh",
    clientEmail: "priya@nextwave.com",
    assignedToId: "USR-003",
    assignedToName: "Amit Kumar",
    priority: "High",
    status: "Open",
    category: "Authentication",
    createdAt: "2026-10-21",
    resolutionNote: "",
    comments: [],
  },
  {
    id: "TKT-103",
    title: "Update company profile details",
    description:
      "The client needs help updating the company address and contact information.",
    projectName: "Client Portal",
    clientName: "Rahul Sharma",
    clientEmail: "rahul@brighttech.com",
    assignedToId: "USR-003",
    assignedToName: "Amit Kumar",
    priority: "Low",
    status: "Resolved",
    category: "Enhancement",
    createdAt: "2026-10-18",
    resolutionNote: "Updated the profile form validation and saved the changes.",
    comments: [],
  },
  {
    id: "TKT-104",
    title: "Dashboard report is showing incorrect totals",
    description:
      "The monthly report total does not match the total of the listed transactions.",
    projectName: "CRM Application",
    clientName: "Priya Singh",
    clientEmail: "priya@nextwave.com",
    assignedToId: "USR-003",
    assignedToName: "Amit Kumar",
    priority: "Medium",
    status: "Open",
    category: "Data Issue",
    createdAt: "2026-10-22",
    resolutionNote: "",
    comments: [],
  },
  {
    id: "TKT-105",
    title: "Mobile navigation menu overlaps content",
    description:
      "On smaller screens, the navigation menu overlaps the page content.",
    projectName: "E-commerce Website",
    clientName: "Rahul Sharma",
    clientEmail: "rahul@brighttech.com",
    assignedToId: "USR-003",
    assignedToName: "Amit Kumar",
    priority: "Medium",
    status: "In Progress",
    category: "UI Issue",
    createdAt: "2026-10-23",
    resolutionNote: "",
    comments: [],
  },
  {
    id: "TKT-106",
    title: "Email notification is not received",
    description:
      "The client is not receiving an email after submitting a support request.",
    projectName: "Client Portal",
    clientName: "Priya Singh",
    clientEmail: "priya@nextwave.com",
    assignedToId: "USR-003",
    assignedToName: "Amit Kumar",
    priority: "Low",
    status: "Closed",
    category: "Notification",
    createdAt: "2026-10-15",
    resolutionNote: "Email notification configuration was corrected and verified.",
    comments: [],
  },
];

export function getAllDeveloperTickets() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error("Unable to read demo tickets:", error);
  }

  return initialTickets;
}

export function saveAllDeveloperTickets(tickets) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
  } catch (error) {
    console.error("Unable to save demo tickets:", error);
  }
}

export function getAssignedTickets() {
  return getAllDeveloperTickets().filter(
    (ticket) => ticket.assignedToId === CURRENT_DEVELOPER_ID
  );
}

export function getDeveloperTicketById(ticketId) {
  return getAssignedTickets().find((ticket) => ticket.id === ticketId);
}

export function updateDeveloperTicket(ticketId, updates) {
  const tickets = getAllDeveloperTickets().map((ticket) =>
    ticket.id === ticketId &&
    ticket.assignedToId === CURRENT_DEVELOPER_ID
      ? { ...ticket, ...updates }
      : ticket
  );

  saveAllDeveloperTickets(tickets);

  return getDeveloperTicketById(ticketId);
}