import {Alert, Artifact, Build, Environment, EnvironmentBuilds} from './domain';
import {HttpErrorResponse} from '@angular/common/http';
import {IEnvironment} from '../core/flux-store/model';

export const artifactsForVerification = (environment: Environment) => {
  return environment.artifacts.filter((artifact) => artifact.project?.length > 0 && artifact.branch?.length > 0)
}

export const artifactOf = (environment: IEnvironment, project: string) => {
  return environment.artifacts.find((artifact: Artifact) => artifact.project == project);
}

export const toBuildsArray = (e: EnvironmentBuilds): Build[] => {
  let toReturn: Build[] = [];
  for (let key in e.builds) {
    toReturn.push(e.builds[key])
  }
  return toReturn;
}

export const toAlert = (errorResponse: HttpErrorResponse): Alert => {
  if (!!errorResponse.error) {
    return {
      type: 'error',
      heading: errorResponse.error['description'],
      message: errorResponse.error['message']
    }
  } else {
    return {
      type: 'error',
      heading: `Unexpected Error: ${errorResponse.status}`,
      message: errorResponse.statusText
    }
  }
}
