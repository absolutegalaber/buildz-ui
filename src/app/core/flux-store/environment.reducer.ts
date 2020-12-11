import {createReducer, on} from '@ngrx/store';
import {environmentBuildsLoaded, environmentSelected, knownEnvironmentsLoaded, singleEnvironmentLoaded, updateCurrentEnvironment} from './environment.actions';
import {IEnvironment, IEnvironments} from './model';
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
  })
)

export function environmentReducer(state, action) {
  return _environmentReducer(state, action)
}
