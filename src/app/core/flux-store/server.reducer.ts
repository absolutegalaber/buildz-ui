import {Action, createReducer, on} from '@ngrx/store';
import {IServersState} from './model';
import {
  LOAD_KNOWN_SERVERS_OK,
  DEPLOY_SEARCH,
  DEPLOY_SEARCH_OK,
  RELEASE_SERVER_OK,
  RESERVE_SERVER_OK
} from './server.actions';
import {deepClone} from '../util/deep-clone';

export const INITIAL_SERVER_STATE: IServersState = {
  knownServers: []
};

const REDUCER = createReducer(
  INITIAL_SERVER_STATE,
  on(LOAD_KNOWN_SERVERS_OK, (state: IServersState, {servers}) => {
    const newState = deepClone(state);
    newState.knownServers = servers;

    return newState;
  }),
  on(DEPLOY_SEARCH, (state: IServersState, {serverName, searchParams}) => {
    const newState = deepClone(state);
    if (!newState.currentServer || newState.currentServer.name !== serverName) {
      if (!newState.knownServers && !newState.knownServers.isEmpty()) {
        newState.currentServer = newState.knownServers.find(server => server.name === serverName);
      } else {
        // If the user is navigating directly to the server or if the knownServers list is empty
        // assume that the user's serverName is valid (if it's not the DEPLOY_SEARCH_OK will
        // handle the error message).
        newState.currentServer = {name: serverName};
      }
    }

    if (searchParams) {
      newState.currentServer.deploysSearch = searchParams;
    } else if (!newState.currentServer.deploysSearch) {
      newState.currentServer.deploysSearch = {
        page: 1,
        pageSize: 10,
        sortAttribute: 'id',
        sortDirection: 'DESC',
      };
    }

    if (newState.currentServer.deploysResult === undefined) {
      newState.currentServer.deploysResult = {};
    }

    return newState;
  }),
  on(DEPLOY_SEARCH_OK, (state: IServersState, {serverName, result}) => {
    const newState = deepClone(state);
    newState.currentServer = {...newState.currentServer, name: serverName, deploysResult: result};

    return newState;
  }),
  on(RESERVE_SERVER_OK, (state: IServersState, { serverName, reservation}) => {
    const newState = deepClone(state);

    if (newState.currentServer && newState.currentServer.name === serverName) {
      newState.currentServer.reservation = reservation;
    }

    const index = newState.knownServers.findIndex(server => server.name === serverName);
    newState.knownServers[index].reservation = reservation;

    return newState;
  }),
  on(RELEASE_SERVER_OK, (state: IServersState, { serverName }) => {
    const newState = deepClone(state);
    if (newState.currentServer && newState.currentServer.name === serverName) {
      newState.currentServer.reservation = null;
    }

    const index = newState.knownServers.findIndex(server => server.name === serverName);
    newState.knownServers[index].reservation = null;

    return newState;
  })
);

export function serverReducer(state: IServersState | undefined, action: Action): IServersState {
  return REDUCER(state, action);
}
