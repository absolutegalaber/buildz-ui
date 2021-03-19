import {Action, createReducer, on} from '@ngrx/store';
import {IDeploySearchResult, IServersState} from './model';
import {DEPLOY_SEARCH_OK, LOAD_KNOWN_SERVERS_OK, LOAD_SINGLE_SERVER, LOAD_SINGLE_SERVER_OK, UPDATE_DEPLOY_SEARCH} from './server.actions';
import {deepClone} from '../util/deep-clone';

export const INITIAL_SERVER_STATE: IServersState = {
  knownServers: [],
  currentServer: {
    id: -1,
    name: ''
  },
  deploysSearch: {
    serverName: '',
    page: 0,
    pageSize: 10,
    sortAttribute: 'id',
    sortDirection: 'DESC'
  },
  deploysResult: <IDeploySearchResult>{}
}

const REDUCER = createReducer(
  INITIAL_SERVER_STATE,
  on(LOAD_KNOWN_SERVERS_OK, (state: IServersState, {servers}) => {
    const newState = deepClone(state);
    newState.knownServers = servers;

    return newState;
  }),
  on(UPDATE_DEPLOY_SEARCH, (state: IServersState, {serverName, newSearch}) => {
    const newState: IServersState = deepClone(state)
    if (!!newSearch) {
      newState.deploysSearch = newSearch
    }
    if (!!serverName) {
      newState.deploysSearch.serverName = serverName
    }
    return newState;
  }),
  on(DEPLOY_SEARCH_OK, (state: IServersState, {result}) => {
    const newState = deepClone(state);
    newState.deploysResult = result
    return newState;
  }),
  on(LOAD_SINGLE_SERVER, (state: IServersState, {serverName}) => {
    const newState = deepClone(state);
    newState.deploysSearch.serverName = serverName;
    return newState;
  }),
  on(LOAD_SINGLE_SERVER_OK, (state: IServersState, {server}) => {
    const newState = deepClone(state);
    newState.currentServer = server;
    return newState;
  })
);

export function serverReducer(state: IServersState | undefined, action: Action): IServersState {
  return REDUCER(state, action);
}
