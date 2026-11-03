import API from "./axios.js";

const getMessages = async (ticketId, chatType, params = {}) => {
  const response = await API.get(`/chat/tickets/${ticketId}/messages`, {
    params: { ...params, chatType },
  });
  return response.data;
};

const sendMessage = async (ticketId, chatType, text) => {
  const response = await API.post(
    `/chat/tickets/${ticketId}/messages`,
    { text },
    { params: { chatType } },
  );
  return response.data;
};

export { getMessages, sendMessage };
