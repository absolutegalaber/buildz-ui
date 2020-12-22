import {createAction, props} from '@ngrx/store';
import {IDeploy, IServer} from './model';

export const LOAD_KNOWN_SERVERS = createAction('LOAD-KNOWN-SERVERS');
export const LOAD_KNOWN_SERVERS_OK = createAction('LOAD_KNOWN_SERVERS_OK', props<{servers: IServer[]}>());
export const LOAD_SERVER_DEPLOYS = createAction('LOAD_SERVER_DEPLOYS', props<{name: string}>());
export const LOAD_SERVER_DEPLOYS_OK = createAction(
  'LOAD_SERVER_DEPLOYS_OK',
  props<{serverName: string, deploys: IDeploy[]}>()
);
