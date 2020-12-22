import {Action, createReducer, on} from '@ngrx/store';

import {IServersState} from './model';
import {LOAD_KNOWN_SERVERS_OK, LOAD_SERVER_DEPLOYS, LOAD_SERVER_DEPLOYS_OK} from './server.actions';
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
    newState.currentServer = { name };

    return newState;
  }),
  on(LOAD_SERVER_DEPLOYS_OK, (state: IServersState, {serverName, deploys}) => {
    const newState = deepClone(state);
    newState.currentServer = {name: serverName, deploys};

    return newState;
  })
);

export function serverReducer(state: IServersState | undefined, action: Action): IServersState {
  return REDUCER(state, action);
}
