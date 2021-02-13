import {createAction, props} from '@ngrx/store';
import {IDeploy, IServer, IReservation, ICreateReservationEvent} from './model';

// Servers related actions
export const LOAD_KNOWN_SERVERS = createAction('LOAD-KNOWN-SERVERS');
export const LOAD_KNOWN_SERVERS_OK = createAction('LOAD_KNOWN_SERVERS_OK', props<{servers: IServer[]}>());
// Deploy related actions
export const LOAD_SERVER_DEPLOYS = createAction('LOAD_SERVER_DEPLOYS', props<{name: string}>());
export const LOAD_SERVER_DEPLOYS_OK = createAction(
  'LOAD_SERVER_DEPLOYS_OK',
  props<{serverName: string, deploys: IDeploy[]}>()
);
// Reservation related actions
export const RESERVE_SERVER = createAction('RESERVE_SERVER', props<{event: ICreateReservationEvent}>());
export const RESERVE_SERVER_OK = createAction('RESERVE_SERVER_OK', props<{serverName: string, reservation: IReservation}>());
export const RELEASE_SERVER = createAction('RELEASE_SERVER', props<{serverName: string}>());
export const RELEASE_SERVER_OK = createAction('RELEASE_SERVER_OK', props<{serverName: string}>());
