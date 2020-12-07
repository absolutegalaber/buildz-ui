import {createAction, props} from '@ngrx/store';
import {IEnvironment, IEnvironmentBuilds} from './model';

export const loadEnvironmentBuilds = createAction('LOAD-ENVIRONMENT-BUILDS', props<{ environmentName: string }>())
export const environmentBuildsLoaded = createAction('ENVIRONMENT-BUILDS-LOADED', props<{ environmentBuilds: IEnvironmentBuilds }>())
export const loadSingleEnvironment = createAction('LOAD-SINGLE-ENVIRONMENT', props<{ environmentName: string }>())
export const singleEnvironmentLoaded = createAction('SINGLE-ENVIRONMENT-LOADED', props<{ environment: IEnvironment }>())
export const environmentSelected = createAction('ENVIRONMENT-SELECTED', props<{ environmentName: string }>())
