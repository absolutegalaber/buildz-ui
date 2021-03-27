import {createAction, props} from '@ngrx/store'
import {ICreateReservationEvent, IDeploySearch, IDeploySearchResult, IServer} from './model'

// Servers related actions
export const LOAD_KNOWN_SERVERS = createAction('LOAD-KNOWN-SERVERS')
export const LOAD_KNOWN_SERVERS_OK = createAction('LOAD_KNOWN_SERVERS_OK', props<{ servers: IServer[] }>())

export const LOAD_SINGLE_SERVER = createAction('LOAD-SINGLE-SERVER', props<{ serverName: string }>())
export const LOAD_SINGLE_SERVER_OK = createAction('LOAD-SINGLE-SERVER_OK', props<{ server: IServer }>())
export const UPDATE_SERVER = createAction('UPDATE_SERVER', props<{ server: IServer }>())

// Deploy related actions
export const UPDATE_DEPLOY_SEARCH = createAction('DEPLOY_SEARCH', props<{ serverName?: string, newSearch?: IDeploySearch }>())
export const DEPLOY_SEARCH = createAction('DEPLOY_SEARCH')
export const DEPLOY_SEARCH_OK = createAction('DEPLOY_SEARCH_OK', props<{ result: IDeploySearchResult }>())

// Reservation related actions
export const RESERVE_SERVER = createAction('RESERVE_SERVER', props<{ event: ICreateReservationEvent }>())
export const RELEASE_SERVER = createAction('RELEASE_SERVER', props<{ serverName: string }>())
