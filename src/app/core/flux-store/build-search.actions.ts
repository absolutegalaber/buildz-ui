import {createAction, props} from '@ngrx/store';
import {IBuildLabel, IBuildSearchParams, IBuildSearchResult} from './model';

export const doBuildSearch = createAction('DO-BUILD-SEARCH')
export const updateSearchParams = createAction('UPDATE-SEARCH-PARAMS', props<{ search: IBuildSearchParams }>())
export const addSearchLabel = createAction('ADD-SEARCH-LABEL', props<{ label: IBuildLabel }>())
export const removeSearchLabel = createAction('REMOVE-SEARCH-LABEL', props<{ label: IBuildLabel }>())
export const resetSearchParams = createAction('RESET-SEARCH-PARAMS')
export const searchBuildsOfProject = createAction('SEARCH-BUILDS-OF-PROJECT', props<{ project: string }>())
export const buildSearchLoaded = createAction('BUILDS-SEARCH-LOADED', props<{ result: IBuildSearchResult }>())
