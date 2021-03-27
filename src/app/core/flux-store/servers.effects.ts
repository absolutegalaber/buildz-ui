import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {HttpClient} from '@angular/common/http'
import {DEPLOY_SEARCH, DEPLOY_SEARCH_OK, LOAD_KNOWN_SERVERS, LOAD_KNOWN_SERVERS_OK, LOAD_SINGLE_SERVER, LOAD_SINGLE_SERVER_OK, RELEASE_SERVER, RESERVE_SERVER, UPDATE_DEPLOY_SEARCH, UPDATE_SERVER} from './server.actions'
import {catchError, exhaustMap, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators'
import {backendErrorOccurred} from './alert.actions'
import {of} from 'rxjs'
import {Buildz, IDeploySearchResult, IReservation, IServer} from './model'
import {select, Store} from '@ngrx/store'
import {theDeploysSearch} from './selectors'

@Injectable()
export class ServersEffects {

  LOAD_KNOWN_SERVERS$ = createEffect(() => this.actions$.pipe(
    ofType(LOAD_KNOWN_SERVERS),
    exhaustMap(() => this.http.get<IServer[]>('/api/v1/servers').pipe(
      map((servers: IServer[]) => LOAD_KNOWN_SERVERS_OK({servers})),
      catchError(errorResponse => of(backendErrorOccurred({errorResponse})))
    ))
    )
  )

  DEPLOY_SEARCH$ = createEffect(() => this.actions$.pipe(
    ofType(DEPLOY_SEARCH, UPDATE_DEPLOY_SEARCH),
    withLatestFrom(this.store.pipe(select(theDeploysSearch))),
    exhaustMap(([action, search]) => this.http.post<IDeploySearchResult>(`/api/v1/deploys/on`, search).pipe(
      map((result: IDeploySearchResult) => DEPLOY_SEARCH_OK({result})),
      catchError(errorResponse => of(backendErrorOccurred({errorResponse})))
      )
    )
  ))

  RESERVE_SERVER$ = createEffect(() => this.actions$.pipe(
    ofType(RESERVE_SERVER),
    switchMap((action) => this.http.post<IReservation>(
      `/api/v1/servers/${action.event.serverName}/reservation`,
      action.event.reservation
    ).pipe(
      mergeMap(() => [LOAD_KNOWN_SERVERS(), LOAD_SINGLE_SERVER({serverName: action.event.serverName})]),
      catchError(errorResponse => of(backendErrorOccurred({errorResponse})))
    ))
  ))

  RELEASE_SERVER$ = createEffect(() => this.actions$.pipe(
    ofType(RELEASE_SERVER),
    exhaustMap((action) => this.http.delete(`/api/v1/servers/${action.serverName}/reservation`).pipe(
      mergeMap(() => [LOAD_KNOWN_SERVERS(), LOAD_SINGLE_SERVER({serverName: action.serverName})]),
      catchError(errorResponse => of(backendErrorOccurred({errorResponse})))
    ))
  ))

  LOAD_SINGLE_SERVER$ = createEffect(() => this.actions$.pipe(
    ofType(LOAD_SINGLE_SERVER),
    exhaustMap((action) => this.http.get<IServer>(`/api/v1/servers/${action.serverName}`).pipe(
      map((server: IServer) => LOAD_SINGLE_SERVER_OK({server})),
      catchError(errorResponse => of(backendErrorOccurred({errorResponse})))
    ))
    )
  )

  UPDATE_SERVER$ = createEffect(() => this.actions$.pipe(
    ofType(UPDATE_SERVER),
    exhaustMap((action) => this.http.post<IServer>(`/api/v1/servers`, action.server).pipe(
      mergeMap((response: IServer) => [LOAD_KNOWN_SERVERS(), LOAD_SINGLE_SERVER({serverName: response.name})]),
      catchError(errorResponse => of(backendErrorOccurred({errorResponse})))
    ))
    )
  )

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<Buildz>
  ) {
  }
}
