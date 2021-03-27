import {createReducer, on} from '@ngrx/store'
import * as EnvironmentActions from './environment.actions'
import {IArtifact, IEnvironments} from './model'
import {deepClone} from '../util/deep-clone'

export const INITIAL_ENVIRONMENT_BUILDS: IEnvironments = {
  knownEnvironments: [],
  currentEnvironmentName: '',
  currentEnvironment: {
    name: '',
    artifacts: []
  },
  environmentBuilds: {
    environment: '',
    builds: {},
    internal: false
  }
}
export const environmentReducerImpl = createReducer(
  INITIAL_ENVIRONMENT_BUILDS,
  on(EnvironmentActions.environmentBuildsLoaded, (state: IEnvironments, {environmentBuilds}) => {
    const newState: IEnvironments = deepClone(state)
    newState.environmentBuilds = environmentBuilds
    return newState
  }),
  on(EnvironmentActions.knownEnvironmentsLoaded, (state: IEnvironments, {environments}) => {
    return {...state, knownEnvironments: environments}
  }),
  on(EnvironmentActions.environmentSelected, (state, {environmentName}) => {
    return {...state, currentEnvironmentName: environmentName}
  }),
  on(EnvironmentActions.singleEnvironmentLoaded, (state: IEnvironments, {environment}) => {
    return {...state, currentEnvironment: environment}
  }),
  on(EnvironmentActions.updateCurrentEnvironment, (state: IEnvironments, {environment}) => {
    return {...state, currentEnvironment: environment}
  }),
  on(EnvironmentActions.environmentToCloneLoaded, (state: IEnvironments, {environment}) => {
    const newState: IEnvironments = deepClone(state)
    delete newState.currentEnvironment.id
    newState.currentEnvironment.name = `CLONED-FROM-${environment.name} - Edit!!`
    newState.currentEnvironment.artifacts = environment.artifacts.map((artifact) => {
      return {
        project: artifact.project,
        branch: artifact.branch,
        labels: artifact.labels
      }
    })
    return newState
  }),
  on(EnvironmentActions.toggleArtifactOfEnvironment, (state: IEnvironments, {projectName}) => {
    const newState: IEnvironments = deepClone(state)
    const a = newState.currentEnvironment.artifacts.find((artifact: IArtifact) => artifact.project === projectName)
    if (!!a) {
      newState.currentEnvironment.artifacts = newState.currentEnvironment.artifacts.filter((artifact) => artifact.project !== projectName)
    } else {
      newState.currentEnvironment.artifacts.push({
        project: projectName,
        branch: '',
        labels: {},
      })
    }
    return newState
  }),
  on(EnvironmentActions.addArtifactLabel, (state: IEnvironments, {label}) => {
    const newState = deepClone(state)
    const theArtifact: IArtifact = newState.currentEnvironment.artifacts.find((artifact) => artifact.project === label.projectName)
    if (!!theArtifact) {
      theArtifact.labels[label.key] = label.value
    }
    return newState
  }),
  on(EnvironmentActions.removeArtifactLabel, (state: IEnvironments, {label}) => {
    const newState = deepClone(state)
    const theArtifact: IArtifact = newState.currentEnvironment.artifacts.find((artifact) => artifact.project === label.projectName)
    if (!!theArtifact) {
      delete theArtifact.labels[label.key]
    }
    return newState
  }),
  on(EnvironmentActions.newEnvironment, (state) => {
    const newState: IEnvironments = deepClone(state)
    newState.currentEnvironmentName = ''
    newState.currentEnvironment = {
      name: '',
      artifacts: []
    }
    newState.environmentBuilds = {
      environment: '',
      builds: {},
      internal: false
    }
    return newState
  })
)

export function environmentReducer(state, action) {
  return environmentReducerImpl(state, action)
}
