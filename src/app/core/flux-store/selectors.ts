import {Buildz, IArtifact, IBuild, IBuildSearchParams, IBuildSearchResult, IBuildStats, IEnvironment, IEnvironmentBuilds, IProjects, IProjectWithBranches, ISelectedProjectAndBranch} from './model';

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
export const currentEnvironment = (state: Buildz): IEnvironment => state.environments.currentEnvironment
export const environmentBuildsAsArray = (state: Buildz): IBuild[] => {
  let environmentBuildsMap = state.environments.environmentBuilds.builds
  return Object.keys(environmentBuildsMap).map((key) => environmentBuildsMap[key])
}
export const environmentBuilds = (state: Buildz): IEnvironmentBuilds => state.environments.environmentBuilds
export const buildStats = (state: Buildz): IBuildStats => state.stats
export const verificationArtifacts = (state: Buildz): IArtifact[] =>
  state.environments.currentEnvironment.artifacts.filter((artifact) => artifact.project.length > 0 && artifact.branch.length > 0)


