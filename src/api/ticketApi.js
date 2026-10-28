
import api from "./axios";

// Get all tickets according to the logged-in user's role
export const getTickets = async () => {
  const response = await api.get("/tickets");
  return response.data;
};

// Get a single ticket by ID
export const getTicketById = async (ticketId) => {
  const response = await api.get(`/tickets/${ticketId}`);
  return response.data;
};

// Client creates a new ticket
export const createTicket = async (ticketData) => {
  const response = await api.post("/tickets", ticketData);
  return response.data;
};

// Admin assigns a developer to a ticket
export const assignDeveloper = async (ticketId, developerId) => {
  const response = await api.patch(`/tickets/${ticketId}/assign`, {
    developerId,
  });

  return response.data;
};

export const reviewTicket = async (ticketId, reviewData) => {
  const response = await api.patch(`/tickets/${ticketId}/review`, reviewData);
  return response.data;
};

// Developer updates ticket status
export const updateTicketStatus = async (
  ticketId,
  status,
  resolution = ""
) => {
  const response = await api.patch(`/tickets/${ticketId}/status`, {
    status,
    ...(resolution ? { resolution } : {}),
  });

  return response.data;
};

// Admin deletes a ticket
export const deleteTicket = async (ticketId) => {
  const response = await api.delete(`/tickets/${ticketId}`);
  return response.data;
};
