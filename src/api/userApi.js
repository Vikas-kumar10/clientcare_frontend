import API from "./axios.js";

export const getUsers = async (params = {}) => {
  const response = await API.get("/users", { params });
  return response.data;
};
