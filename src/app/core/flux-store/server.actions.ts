import {createAction, props} from '@ngrx/store';
import {
  IServer,
  IReservation,
  ICreateReservationEvent,
  IDeploySearchResult,
  IBaseSearchParams
} from './model';

// Servers related actions
export const LOAD_KNOWN_SERVERS = createAction('LOAD-KNOWN-SERVERS');
export const LOAD_KNOWN_SERVERS_OK = createAction('LOAD_KNOWN_SERVERS_OK', props<{servers: IServer[]}>());

// Deploy related actions
export const DEPLOY_SEARCH = createAction('DEPLOY_SEARCH', props<{serverName: string, searchParams?: IBaseSearchParams}>());
export const DEPLOY_SEARCH_OK = createAction('DEPLOY_SEARCH_OK', props<{serverName: string, result: IDeploySearchResult }>());

// Reservation related actions
export const RESERVE_SERVER = createAction('RESERVE_SERVER', props<{event: ICreateReservationEvent}>());
export const RESERVE_SERVER_OK = createAction('RESERVE_SERVER_OK', props<{serverName: string, reservation: IReservation}>());
export const RELEASE_SERVER = createAction('RELEASE_SERVER', props<{serverName: string}>());
export const RELEASE_SERVER_OK = createAction('RELEASE_SERVER_OK', props<{serverName: string}>());
