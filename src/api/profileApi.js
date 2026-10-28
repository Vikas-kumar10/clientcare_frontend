import API from "./axios.js";

// Get logged-in user's profile
export const getMyProfile = async () => {
  const response = await API.get("/auth/me");
  return response.data;
};

// Update editable profile fields
export const updateMyProfile = async (profileData) => {
  const response = await API.patch("/auth/profile", profileData);
  return response.data;
};