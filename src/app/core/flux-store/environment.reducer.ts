import {createReducer, on} from '@ngrx/store';
import {addArtifactLabel, environmentBuildsLoaded, environmentSelected, environmentToCloneLoaded, knownEnvironmentsLoaded, newEnvironment, removeArtifactLabel, singleEnvironmentLoaded, toggleArtifactOfEnvironment, updateCurrentEnvironment} from './environment.actions';
import {IArtifact, IEnvironment, IEnvironments} from './model';
import {deepClone} from '../util/deep-clone';

export const INITIAL_ENVIRONMENT_BUILDS: IEnvironments = {
  knownEnvironments: [],
  currentEnvironmentName: '',
  currentEnvironment: <IEnvironment>{
    name: '',
    artifacts: []
  },
  environmentBuilds: {
    environment: '',
    builds: {}
  }
}
export const _environmentReducer = createReducer(
  INITIAL_ENVIRONMENT_BUILDS,
  on(environmentBuildsLoaded, (state: IEnvironments, {environmentBuilds}) => {
    let newState: IEnvironments = deepClone(state)
    newState.environmentBuilds = environmentBuilds
    return newState
  }),
  on(knownEnvironmentsLoaded, (state: IEnvironments, {environments}) => {
    return {...state, knownEnvironments: environments}
  }),
  on(environmentSelected, (state, {environmentName}) => {
    return {...state, currentEnvironmentName: environmentName}
  }),
  on(singleEnvironmentLoaded, (state: IEnvironments, {environment}) => {
    return {...state, currentEnvironment: environment}
  }),
  on(updateCurrentEnvironment, (state: IEnvironments, {environment}) => {
    return {...state, currentEnvironment: environment}
  }),
  on(environmentToCloneLoaded, (state: IEnvironments, {environment}) => {
    let newState: IEnvironments = deepClone(state)
    delete newState.currentEnvironment.id
    newState.currentEnvironment.name = `CLONED-FROM-${environment.name} - Edit!!`
    newState.currentEnvironment.artifacts = environment.artifacts.map((artifact) => {
      return <IArtifact>{
        project: artifact.project,
        branch: artifact.branch,
        labels: artifact.labels
      }
    })
    return newState
  }),
  on(toggleArtifactOfEnvironment, (state: IEnvironments, {projectName}) => {
    let newState: IEnvironments = deepClone(state)
    let a = newState.currentEnvironment.artifacts.find((artifact: IArtifact) => artifact.project == projectName)
    if (!!a) {
      newState.currentEnvironment.artifacts = newState.currentEnvironment.artifacts.filter((a) => a.project != projectName)
    } else {
      newState.currentEnvironment.artifacts.push({
        project: projectName,
        branch: '',
        labels: {},
      })
    }
    return newState
  }),
  on(addArtifactLabel, (state: IEnvironments, {label}) => {
    let newState = deepClone(state)
    let theArtifact: IArtifact = newState.currentEnvironment.artifacts.find((artifact) => artifact.project == label.projectName)
    if (!!theArtifact) {
      theArtifact.labels[label.key] = label.value
    }
    return newState
  }),
  on(removeArtifactLabel, (state: IEnvironments, {label}) => {
    let newState = deepClone(state)
    let theArtifact: IArtifact = newState.currentEnvironment.artifacts.find((artifact) => artifact.project == label.projectName)
    if (!!theArtifact) {
      delete theArtifact.labels[label.key]
    }
    return newState
  }),
  on(newEnvironment, (state) => {
    let newState: IEnvironments = deepClone(state)
    newState.currentEnvironmentName = ''
    newState.currentEnvironment = {
      name: '',
      artifacts: []
    }
    newState.environmentBuilds = {
      environment: '',
      builds: {}
    }
    return newState
  })
)

export function environmentReducer(state, action) {
  return _environmentReducer(state, action)
}
