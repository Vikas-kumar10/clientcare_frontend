
import API from "./axios";

// Create a new project
export const createProject = async (projectData) => {
  const response = await API.post("/projects", projectData);
  return response.data;
};

// Get all projects
export const getProjects = async () => {
  const response = await API.get("/projects");
  return response.data;
};

// Get project by ID
export const getProjectById = async (projectId) => {
  const response = await API.get(`/projects/${projectId}`);
  return response.data;
};

// Update project
export const updateProject = async (projectId, projectData) => {
  const response = await API.put(
    `/projects/${projectId}`,
    projectData
  );
  return response.data;
};

// Delete project
export const deleteProject = async (projectId) => {
  const response = await API.delete(`/projects/${projectId}`);
  return response.data;
};
