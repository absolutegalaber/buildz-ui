import {Artifact, Environment} from './domain';

export const artifactsForVerification = (environment: Environment) => {
  return environment.artifacts.filter((artifact) => artifact.project?.length > 0 && artifact.branch?.length > 0)
}

export const artifactOf = (environment: Environment, project: string) => {
  return environment.artifacts.find((artifact: Artifact) => artifact.project == project);
}
