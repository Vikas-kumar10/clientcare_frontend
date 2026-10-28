
export const clientUser = {
  name: "Alex Morgan",
  email: "alex.morgan@example.com",
  company: "Acme Technologies",
  initials: "AM",
};

export const projects = [
  {
    id: "PRJ-101",
    name: "E-commerce Website",
    description: "Online store, checkout and order management system.",
    category: "Web Application",
    status: "Active",
    progress: 85,
    color: "#C2410C",
    initials: "EC",
    startDate: "Jan 12, 2026",
    deliveryDate: "Oct 30, 2026",
  },
  {
    id: "PRJ-102",
    name: "Customer Portal",
    description: "Customer accounts, support requests and profile management.",
    category: "Web Application",
    status: "Active",
    progress: 64,
    color: "#0F766E",
    initials: "CP",
    startDate: "Feb 05, 2026",
    deliveryDate: "Nov 15, 2026",
  },
  {
    id: "PRJ-103",
    name: "Inventory Dashboard",
    description: "Inventory reports, stock tracking and analytics.",
    category: "Dashboard",
    status: "Completed",
    progress: 100,
    color: "#7C3AED",
    initials: "ID",
    startDate: "Nov 10, 2025",
    deliveryDate: "Mar 20, 2026",
  },
];

export const tickets = [
  {
    id: "TKT-1001",
    title: "Payment successful but order not created",
    projectId: "PRJ-101",
    projectName: "E-commerce Website",
    category: "Payment",
    priority: "High",
    status: "In Progress",
    description:
      "The payment is successful, but the order is not visible in the order history. Please investigate the checkout flow.",
    createdAt: "Oct 22, 2026",
    updatedAt: "Oct 24, 2026",
    assignedTo: {
      name: "Rahul Sharma",
      role: "Backend Developer",
      initials: "RS",
    },
    resolution: "",
    timeline: [
      {
        title: "Ticket created",
        description: "You reported this issue.",
        date: "Oct 22, 2026 · 10:30 AM",
        completed: true,
      },
      {
        title: "Developer assigned",
        description: "Rahul Sharma has been assigned.",
        date: "Oct 22, 2026 · 11:15 AM",
        completed: true,
      },
      {
        title: "Investigation in progress",
        description: "The team is checking the payment callback.",
        date: "Oct 24, 2026 · 09:45 AM",
        completed: true,
      },
      {
        title: "Issue resolved",
        description: "The fix will be recorded here.",
        date: "Pending",
        completed: false,
      },
    ],
  },
  {
    id: "TKT-1002",
    title: "Unable to receive login OTP",
    projectId: "PRJ-102",
    projectName: "Customer Portal",
    category: "Authentication",
    priority: "Urgent",
    status: "Open",
    description:
      "Login OTP is not arriving at the registered email address. The issue occurs whenever I try to sign in.",
    createdAt: "Oct 23, 2026",
    updatedAt: "Oct 23, 2026",
    assignedTo: null,
    resolution: "",
    timeline: [
      {
        title: "Ticket created",
        description: "You reported this issue.",
        date: "Oct 23, 2026 · 02:10 PM",
        completed: true,
      },
      {
        title: "Admin review",
        description: "Waiting for the support team to review the ticket.",
        date: "Pending",
        completed: false,
      },
      {
        title: "Developer assigned",
        description: "A developer will be assigned.",
        date: "Pending",
        completed: false,
      },
    ],
  },
  {
    id: "TKT-1003",
    title: "Product images loading slowly",
    projectId: "PRJ-101",
    projectName: "E-commerce Website",
    category: "Performance",
    priority: "Medium",
    status: "Resolved",
    description:
      "Product images were loading slowly on the product listing page.",
    createdAt: "Oct 18, 2026",
    updatedAt: "Oct 21, 2026",
    assignedTo: {
      name: "Priya Verma",
      role: "Frontend Developer",
      initials: "PV",
    },
    resolution:
      "The image loading issue was addressed by optimizing image sizes and lazy loading.",
    timeline: [
      {
        title: "Ticket created",
        description: "You reported this issue.",
        date: "Oct 18, 2026 · 09:00 AM",
        completed: true,
      },
      {
        title: "Developer assigned",
        description: "Priya Verma was assigned.",
        date: "Oct 18, 2026 · 10:00 AM",
        completed: true,
      },
      {
        title: "Issue resolved",
        description: "The fix was completed.",
        date: "Oct 21, 2026 · 04:30 PM",
        completed: true,
      },
    ],
  },
  {
    id: "TKT-1004",
    title: "Dashboard report date is incorrect",
    projectId: "PRJ-103",
    projectName: "Inventory Dashboard",
    category: "Data & Reports",
    priority: "Low",
    status: "Closed",
    description:
      "The report date was displayed incorrectly in the monthly inventory summary.",
    createdAt: "Sep 15, 2026",
    updatedAt: "Sep 18, 2026",
    assignedTo: {
      name: "Amit Kumar",
      role: "Full Stack Developer",
      initials: "AK",
    },
    resolution: "The date formatting issue has been corrected.",
    timeline: [
      {
        title: "Ticket created",
        description: "You reported this issue.",
        date: "Sep 15, 2026",
        completed: true,
      },
      {
        title: "Issue resolved and closed",
        description: "The correction was completed.",
        date: "Sep 18, 2026",
        completed: true,
      },
    ],
  },
];

export const activity = [
  {
    id: 1,
    type: "update",
    title: "Payment issue is being investigated",
    ticketId: "TKT-1001",
    time: "Today, 9:45 AM",
  },
  {
    id: 2,
    type: "created",
    title: "You reported a login OTP issue",
    ticketId: "TKT-1002",
    time: "Yesterday, 2:10 PM",
  },
  {
    id: 3,
    type: "resolved",
    title: "Product image issue was resolved",
    ticketId: "TKT-1003",
    time: "Oct 21, 2026",
  },
];



export const users = [
  {
    id: "USR-001",
    name: "Rahul Sharma",
    initials: "RS",
    email: "rahul@brighttech.com",
    role: "Client",
    company: "BrightTech Solutions",
    status: "Active",
  },
  {
    id: "USR-002",
    name: "Priya Singh",
    initials: "PS",
    email: "priya@nextwave.com",
    role: "Client",
    company: "NextWave Technologies",
    status: "Active",
  },
  {
    id: "USR-003",
    name: "Amit Kumar",
    initials: "AK",
    email: "amit@clientcare.demo",
    role: "Developer",
    company: "ClientCare",
    status: "Active",
  },
  {
    id: "USR-004",
    name: "Neha Verma",
    initials: "NV",
    email: "neha@clientcare.demo",
    role: "Developer",
    company: "ClientCare",
    status: "Active",
  },
  {
    id: "USR-005",
    name: "Rohit Das",
    initials: "RD",
    email: "rohit@clientcare.demo",
    role: "Developer",
    company: "ClientCare",
    status: "Active",
  },
];
