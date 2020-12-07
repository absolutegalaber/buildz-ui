import {createReducer, on} from '@ngrx/store';
import {buildSearchLoaded, searchBuildsOfProject, updateSearchParams} from './build-search.actions';
import {IBuilds, IBuildSearchResult} from './model';
import {deepClone} from '../util/deep-clone';

export const EMPTY_BUILD_SEARCH: IBuilds = {
  search: {
    project: '',
    branch: '',
    page: 0,
    pageSize: 10,
    labels: {},
    sortAttribute: 'buildNumber',
    sortDirection: 'DESC',
  },
  result: <IBuildSearchResult>{}
}

export const _buildSearchReducer = createReducer(
  EMPTY_BUILD_SEARCH,
  on(buildSearchLoaded, (state: IBuilds, {result}) => {
    return {...state, result: result}
  }),
  on(updateSearchParams, (state: IBuilds, {search}) => {
    return {...state, search: search}
  }),
  on(searchBuildsOfProject, (state: IBuilds, {project}) => {
    let toReturn: IBuilds = deepClone(state)
    toReturn.search.project = project
    return toReturn;
  })
)

export function buildSearchReducer(state, action) {
  return _buildSearchReducer(state, action)
}
