import API from "./axios.js";

export const getNotifications = async (params = {}) => {
  const response = await API.get("/notifications", { params });
  return response.data;
};

export const getUnreadNotificationCount = async () => {
  const response = await API.get("/notifications/unread-count");
  return response.data;
};

export const markNotificationAsRead = async (notificationId) => {
  const response = await API.patch(`/notifications/${notificationId}/read`);
  return response.data;
};

export const markAllNotificationsAsRead = async () => {
  const response = await API.patch("/notifications/read-all");
  return response.data;
};
