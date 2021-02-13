import {Action, createReducer, on} from '@ngrx/store';
import {IServersState} from './model';
import {
  LOAD_KNOWN_SERVERS_OK,
  LOAD_SERVER_DEPLOYS,
  LOAD_SERVER_DEPLOYS_OK,
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
  // Temporarily set the currentServer to just the server name while the network fetch completes
  on(LOAD_SERVER_DEPLOYS, (state: IServersState, {name}) => {
    const newState = deepClone(state);
    newState.currentServer = newState.knownServers.find(server => server.name === name);

    return newState;
  }),
  on(LOAD_SERVER_DEPLOYS_OK, (state: IServersState, {serverName, deploys}) => {
    const newState = deepClone(state);
    newState.currentServer = {...newState.currentServer, name: serverName, deploys};

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
