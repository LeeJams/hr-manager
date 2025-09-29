import { create } from 'zustand';
import { Project, ProjectRequest, Team } from '../types';

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  projectRequests: ProjectRequest[];
  teams: Team[];
  isLoading: boolean;
  error: string | null;
}

interface ProjectActions {
  setProjects: (projects: Project[]) => void;
  addProject: (project: Project) => void;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
  deleteProject: (projectId: string) => void;
  setCurrentProject: (project: Project | null) => void;
  setProjectRequests: (requests: ProjectRequest[]) => void;
  addProjectRequest: (request: ProjectRequest) => void;
  updateProjectRequest: (requestId: string, updates: Partial<ProjectRequest>) => void;
  setTeams: (teams: Team[]) => void;
  addTeam: (team: Team) => void;
  updateTeam: (teamId: string, updates: Partial<Team>) => void;
  deleteTeam: (teamId: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

type ProjectStore = ProjectState & ProjectActions;

export const useProjectStore = create<ProjectStore>((set, get) => ({
  // Initial state
  projects: [],
  currentProject: null,
  projectRequests: [],
  teams: [],
  isLoading: false,
  error: null,

  // Actions
  setProjects: (projects) =>
    set({
      projects,
    }),

  addProject: (project) =>
    set((state) => ({
      projects: [...state.projects, project],
    })),

  updateProject: (projectId, updates) =>
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === projectId ? { ...project, ...updates } : project
      ),
      currentProject:
        state.currentProject?.id === projectId
          ? { ...state.currentProject, ...updates }
          : state.currentProject,
    })),

  deleteProject: (projectId) =>
    set((state) => ({
      projects: state.projects.filter((project) => project.id !== projectId),
      currentProject:
        state.currentProject?.id === projectId ? null : state.currentProject,
    })),

  setCurrentProject: (project) =>
    set({
      currentProject: project,
    }),

  setProjectRequests: (requests) =>
    set({
      projectRequests: requests,
    }),

  addProjectRequest: (request) =>
    set((state) => ({
      projectRequests: [...state.projectRequests, request],
    })),

  updateProjectRequest: (requestId, updates) =>
    set((state) => ({
      projectRequests: state.projectRequests.map((request) =>
        request.id === requestId ? { ...request, ...updates } : request
      ),
    })),

  setTeams: (teams) =>
    set({
      teams,
    }),

  addTeam: (team) =>
    set((state) => ({
      teams: [...state.teams, team],
    })),

  updateTeam: (teamId, updates) =>
    set((state) => ({
      teams: state.teams.map((team) =>
        team.id === teamId ? { ...team, ...updates } : team
      ),
    })),

  deleteTeam: (teamId) =>
    set((state) => ({
      teams: state.teams.filter((team) => team.id !== teamId),
    })),

  setLoading: (loading) =>
    set({
      isLoading: loading,
    }),

  setError: (error) =>
    set({
      error,
    }),

  clearError: () =>
    set({
      error: null,
    }),
}));