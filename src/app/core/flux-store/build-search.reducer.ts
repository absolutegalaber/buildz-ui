import {createReducer, on} from '@ngrx/store'
import {addSearchLabel, buildSearchLoaded, removeSearchLabel, resetSearchParams, searchBuildsOfProject, updateSearchParams} from './build-search.actions'
import {IBuilds, IBuildSearchResult} from './model'
import {deepClone} from '../util/deep-clone'

export const INITIAL_BUILD_SEARCH: IBuilds = {
  search: {
    project: '',
    branch: '',
    page: 0,
    pageSize: 10,
    labels: {},
    sortAttribute: 'buildNumber',
    sortDirection: 'DESC',
  },
  result: {} as IBuildSearchResult
}

export const buildSearchReducerImpl = createReducer(
  INITIAL_BUILD_SEARCH,
  on(buildSearchLoaded, (state: IBuilds, {result}) => {
    return {...state, result}
  }),
  on(updateSearchParams, (state: IBuilds, {search}) => {
    return {...state, search}
  }),
  on(addSearchLabel, (state: IBuilds, {label}) => {
    const newState: IBuilds = deepClone(state)
    newState.search.labels[label.key] = label.value
    return newState
  }),
  on(removeSearchLabel, (state: IBuilds, {label}) => {
    const newState: IBuilds = deepClone(state)
    delete newState.search.labels[label.key]
    return newState
  }),
  on(resetSearchParams, (state: IBuilds) => INITIAL_BUILD_SEARCH),
  on(searchBuildsOfProject, (state: IBuilds, {project}) => {
    const toReturn: IBuilds = deepClone(state)
    toReturn.search.project = project
    return toReturn
  })
)

export function buildSearchReducer(state, action) {
  return buildSearchReducerImpl(state, action)
}
