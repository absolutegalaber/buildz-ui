import {Buildz, IBuild, IBuildSearchParams, IBuildSearchResult, IBuildStats, IProjects, IProjectWithBranches, ISelectedProjectAndBranch} from './model';

export const buildSearchParams = (state: Buildz): IBuildSearchParams => state.builds.search
export const buildSearchResult = (state: Buildz): IBuildSearchResult => state.builds.result
export const projects = (state: Buildz): IProjects => state.projects;
export const projectNames = (state: Buildz): string[] => state.projects.projects;
export const includeInactiveProjects = (state: Buildz): boolean => state.projects.inactiveIncluded;
export const currentProject = (state: Buildz): string => state.projects.currentProject;
export const currentBranch = (state: Buildz): string => state.projects.currentBranch;
export const currentProjectWithBranches = (state: Buildz): IProjectWithBranches => {
  return {
    project: state.projects.currentProject,
    branches: state.projects.projectBranches[state.projects.currentProject]
  }
}
export const selectedProjectAndBranch = (state: Buildz): ISelectedProjectAndBranch => {
  return {
    project: state.projects.currentProject,
    branch: state.projects.currentBranch
  }
}
export const environmentNames = (state: Buildz): string[] => state.stats.environments
export const currentEnvironmentName = (state: Buildz): string => state.environments.currentEnvironmentName
export const environmentBuildsAsArray = (state: Buildz): IBuild[] => {
  let environmentBuildsMap = state.environments.environmentBuilds.builds
  return Object.keys(environmentBuildsMap).map((key) => environmentBuildsMap[key])
}
export const buildStats = (state: Buildz): IBuildStats => state.stats


