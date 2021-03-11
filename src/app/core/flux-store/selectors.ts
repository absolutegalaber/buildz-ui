import {
  Buildz,
  IAlert,
  IArtifact,
  IBuild,
  IBuildSearchParams,
  IBuildSearchResult,
  IBuildStats,
  IEnvironment,
  IEnvironmentBuilds,
  IProject,
  IProjects,
  IProjectWithBranches,
  ISelectedProjectAndBranch,
  IServer,
  IBaseSearchParams
} from './model';

export const theBuildSearchParams = (state: Buildz): IBuildSearchParams => state.builds.search
export const theBuildSearchResult = (state: Buildz): IBuildSearchResult => state.builds.result
export const theProjectsState = (state: Buildz): IProjects => state.projects;
export const theProjects = (state: Buildz): IProject[] => state.projects.projects;
export const includeInactiveProjects = (state: Buildz): boolean => state.projects.inactiveIncluded;
export const theCurrentProject = (state: Buildz): IProject => state.projects.currentProject;
export const theCurrentProjectWithBranches = (state: Buildz): IProjectWithBranches => {
  return {
    project: state.projects.currentProject,
    branches: state.projects.projectBranches[state.projects.currentProject?.name]
  }
}
export const theSelectedProjectAndBranch = (state: Buildz): ISelectedProjectAndBranch => {
  return {
    project: state.projects.currentProject,
    branch: state.projects.currentBranch
  }
}
export const theEnvironmentNames = (state: Buildz): string[] => state.environments.knownEnvironments
export const theCurrentEnvironmentName = (state: Buildz): string => state.environments.currentEnvironmentName
export const theCurrentEnvironment = (state: Buildz): IEnvironment => state.environments.currentEnvironment
export const theCurrentEnvironmentInternalFlag = (state: Buildz): boolean => state.environments.environmentBuilds ?
    state.environments.environmentBuilds.internal : false;
export const theEnvironmentBuildsAsArray = (state: Buildz): IBuild[] => {
  let environmentBuildsMap = state.environments.environmentBuilds.builds
  return Object.keys(environmentBuildsMap).map((key) => environmentBuildsMap[key])
}
export const theEnvironmentBuilds = (state: Buildz): IEnvironmentBuilds => state.environments.environmentBuilds
export const theBuildStats = (state: Buildz): IBuildStats => state.stats
export const theArtifactsToVerify = (state: Buildz): IArtifact[] =>
  state.environments.currentEnvironment.artifacts.filter((artifact: IArtifact) => artifact.project.length > 0 && artifact.branch.length > 0)

export const theCurrentAlert = (state: Buildz): IAlert => state.alert

// Server related selectors
export const theServers = (state: Buildz): IServer[] => state.servers.knownServers;
export const theCurrentServer = (state: Buildz): IServer => state.servers.currentServer;
export const theCurrentServerName = (state: Buildz): string => state.servers.currentServer.name;
// Specific server deploys search selectors
export const theDeploySearchParams = (state: Buildz): IBaseSearchParams => state.servers.currentServer != null
  ? state.servers.currentServer.deploysSearch
  : {};
