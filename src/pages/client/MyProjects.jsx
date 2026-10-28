
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Plus, LoaderCircle, RefreshCw } from "lucide-react";

import { tickets } from "../../data/mockData";
import { getProjects } from "../../api/projectApi";
import { PageHeader } from "../../components/ClientComponent/UI";

import ProjectStats from "../../components/ClientComponent/projects/ProjectStats";
import ProjectFilters from "../../components/ClientComponent/projects/ProjectFilters";
import ProjectList from "../../components/ClientComponent/projects/ProjectList";

export default function MyProjects() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialProject = searchParams.get("project") || "";

  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getProjects();

      // Supports common API response formats:
      // { success: true, projects: [...] }
      // { success: true, data: [...] }
      // [...]

      const projectData = Array.isArray(response)
        ? response
        : response?.projects ?? response?.data ?? [];

      if (!Array.isArray(projectData)) {
        throw new Error("Invalid projects response from server.");
      }

      setProjects(projectData);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to load projects. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        (project.name || "").toLowerCase().includes(searchText) ||
        (project.description || "").toLowerCase().includes(searchText);

      const matchesStatus =
        filter === "All" || project.status === filter;

      const projectId = String(project._id ?? project.id ?? "");

      const matchesProject =
        !initialProject || projectId === initialProject;

      return matchesSearch && matchesStatus && matchesProject;
    });
  }, [projects, search, filter, initialProject]);

  return (
    <div className="space-y-6">
      {/* Page Header + Create Project Button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <PageHeader
            eyebrow="Workspace"
            title="My Projects"
            description="View your projects, project progress and support tickets."
          />
        </div>

        <button
          type="button"
          onClick={() => navigate("/client/create-project")}
          className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-xl bg-[#C2410C] px-5 py-3 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-[#9A3412] focus:outline-none focus:ring-4 focus:ring-orange-200 sm:self-center"
        >
          <Plus size={18} />
          Create Project
        </button>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex min-h-56 flex-col items-center justify-center gap-3 rounded-2xl border border-stone-200 bg-white">
          <LoaderCircle className="animate-spin text-[#C2410C]" size={30} />
          <p className="text-sm text-stone-500">Loading your projects...</p>
        </div>
      ) : error ? (
        /* Error State */
        <div className="flex min-h-56 flex-col items-center justify-center gap-3 rounded-2xl border border-red-200 bg-white p-6 text-center">
          <p className="font-semibold text-stone-800">
            Could not load projects
          </p>
          <p className="max-w-md text-sm text-stone-500">{error}</p>

          <button
            type="button"
            onClick={fetchProjects}
            className="inline-flex items-center gap-2 rounded-xl bg-[#C2410C] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#9A3412]"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
        </div>
      ) : (
        <>
          {/* Project Statistics */}
          <ProjectStats projects={projects} />

          {/* Search and Filters */}
          <ProjectFilters
            search={search}
            setSearch={setSearch}
            filter={filter}
            setFilter={setFilter}
          />

          {/* Project List - Real API Data */}
          <ProjectList
            projects={filteredProjects}
            tickets={tickets}
          />
        </>
      )}
    </div>
  );
}
