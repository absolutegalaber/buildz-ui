import {createReducer, on} from '@ngrx/store';
import {environmentBuildsLoaded, environmentSelected, singleEnvironmentLoaded, updateCurrentEnvironment} from './environment.actions';
import {IEnvironment, IEnvironments} from './model';
import {deepClone} from '../util/deep-clone';

export const EMPTY_ENVIRONMENT_BUILDS: IEnvironments = {
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
  EMPTY_ENVIRONMENT_BUILDS,
  on(environmentBuildsLoaded, (state: IEnvironments, {environmentBuilds}) => {
    let newState: IEnvironments = deepClone(state)
    newState.environmentBuilds = environmentBuilds
    return newState
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
