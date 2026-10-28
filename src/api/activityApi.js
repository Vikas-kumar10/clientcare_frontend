
import API from "./axios.js";

// Get activity logs
export const getActivities = async (params = {}) => {
  const response = await API.get("/activities", { params });
  return response.data;
};

// Get activities for a specific ticket
export const getTicketActivities = async (ticketId, params = {}) => {
  const response = await API.get("/activities", {
    params: { ...params, ticketId },
  });
  return response.data;
};

// Get activities for a specific project
export const getProjectActivities = async (projectId, params = {}) => {
  const response = await API.get("/activities", {
    params: { ...params, projectId },
  });
  return response.data;
};
