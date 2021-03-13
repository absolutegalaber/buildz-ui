import {createAction, props} from '@ngrx/store';
import {IArtifactBuildLabel, IEnvironment, IEnvironmentBuilds} from './model';

export const loadKnownEnvironments = createAction('LOAD-KNOWN-ENVIRONMENTS')
export const knownEnvironmentsLoaded = createAction('KNOWN-ENVIRONMENTS-LOADED', props<{ environments: IEnvironment[] }>())
export const loadEnvironmentBuilds = createAction('LOAD-ENVIRONMENT-BUILDS', props<{ environmentName: string }>())
export const newEnvironment = createAction('NEW-ENVIRONMENT')
export const environmentBuildsLoaded = createAction('ENVIRONMENT-BUILDS-LOADED', props<{ environmentBuilds: IEnvironmentBuilds }>())
export const loadSingleEnvironment = createAction('LOAD-SINGLE-ENVIRONMENT', props<{ environmentName: string }>())
export const singleEnvironmentLoaded = createAction('SINGLE-ENVIRONMENT-LOADED', props<{ environment: IEnvironment }>())
export const environmentSelected = createAction('ENVIRONMENT-SELECTED', props<{ environmentName: string }>())
export const updateCurrentEnvironment = createAction('UPDATE-ENVIRONMENT', props<{ environment: IEnvironment }>())
export const saveEnvironment = createAction('SAVE-ENVIRONMENT', props<{ environment: IEnvironment }>())
export const deleteEnvironment = createAction('DELETE-ENVIRONMENT')
export const cloneCurrentEnvironment = createAction('CLONE-ENVIRONMENT')
export const environmentToCloneLoaded = createAction('ENVIRONMENT-TO-CLONE-LOADED', props<{ environment: IEnvironment }>())
export const addArtifactLabel = createAction('ADD-ARTIFACT-LABEL', props<{ label: IArtifactBuildLabel }>())
export const removeArtifactLabel = createAction('REMOVE-ARTIFACT-LABEL', props<{ label: IArtifactBuildLabel }>())
export const toggleArtifactOfEnvironment = createAction('TOGGLE-ARTIFACT-OF-ENVIRONMENT', props<{ projectName: string }>())
