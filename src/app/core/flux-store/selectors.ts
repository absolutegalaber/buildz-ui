import * as Model from './model'

export const theBuildSearchParams = (state: Model.Buildz): Model.IBuildSearchParams =>
  state.builds.search
export const theBuildSearchResult = (state: Model.Buildz): Model.IBuildSearchResult =>
  state.builds.result
export const theProjectsState = (state: Model.Buildz): Model.IProjects =>
  state.projects
export const theProjects = (state: Model.Buildz): Model.IProject[] =>
  state.projects.projects
export const includeInactiveProjects = (state: Model.Buildz): boolean =>
  state.projects.inactiveIncluded
export const theCurrentProject = (state: Model.Buildz): Model.IProject =>
  state.projects.currentProject
export const theCurrentProjectWithBranches = (state: Model.Buildz): Model.IProjectWithBranches => {
  return {
    project: state.projects.currentProject,
    branches: state.projects.projectBranches[state.projects.currentProject?.name]
  }
}
export const theSelectedProjectAndBranch = (state: Model.Buildz): Model.ISelectedProjectAndBranch => {
  return {
    project: state.projects.currentProject,
    branch: state.projects.currentBranch
  }
}
export const theDefinedEnvironments = (state: Model.Buildz): Model.IEnvironment[] =>
  state.environments.knownEnvironments.filter((it) => !it.internal)
export const theInternalEnvironments = (state: Model.Buildz): Model.IEnvironment[] =>
  state.environments.knownEnvironments.filter((it) => it.internal)
export const theCurrentEnvironmentName = (state: Model.Buildz): string =>
  state.environments.currentEnvironmentName
export const theCurrentEnvironment = (state: Model.Buildz): Model.IEnvironment =>
  state.environments.currentEnvironment
export const theCurrentEnvironmentInternalFlag = (state: Model.Buildz): boolean =>
  state.environments.environmentBuilds ? state.environments.environmentBuilds.internal : false
export const theEnvironmentBuildsAsArray = (state: Model.Buildz): Model.IBuild[] => {
  const environmentBuildsMap = state.environments.environmentBuilds.builds
  return Object.keys(environmentBuildsMap).map((key) => environmentBuildsMap[key])
}
export const theEnvironmentBuilds = (state: Model.Buildz): Model.IEnvironmentBuilds =>
  state.environments.environmentBuilds
export const theBuildStats = (state: Model.Buildz): Model.IBuildStats =>
  state.stats
export const theArtifactsToVerify = (state: Model.Buildz): Model.IArtifact[] =>
  state.environments.currentEnvironment.artifacts.filter((artifact: Model.IArtifact) =>
    artifact.project.length > 0 && artifact.branch.length > 0)

export const theCurrentAlert = (state: Model.Buildz): Model.IAlert => state.alert

// Server related selectors
export const theServers = (state: Model.Buildz): Model.IServer[] =>
  state.servers.knownServers
export const theCurrentServer = (state: Model.Buildz): Model.IServer =>
  state.servers.currentServer
export const theCurrentServerName = (state: Model.Buildz): string =>
  state.servers.currentServer.name
// Specific server deploys search selectors
export const theDeploySearchParams = (state: Model.Buildz): Model.IBaseSearchParams =>
  state.servers.deploysSearch
export const theDeploysResult = (state: Model.Buildz): Model.IDeploySearchResult =>
  state.servers.deploysResult
export const theDeploysSearch = (state: Model.Buildz): Model.IDeploySearch =>
  state.servers.deploysSearch
export const theTotalNumberOfDeploys = (state: Model.Buildz): number =>
  state.servers.deploysResult?.totalElements
