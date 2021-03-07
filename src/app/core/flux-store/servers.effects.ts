import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {HttpClient} from '@angular/common/http';
import {
  DEPLOY_SEARCH,
  DEPLOY_SEARCH_OK,
  LOAD_KNOWN_SERVERS,
  LOAD_KNOWN_SERVERS_OK,
  RESERVE_SERVER,
  RESERVE_SERVER_OK,
  RELEASE_SERVER,
  RELEASE_SERVER_OK
} from './server.actions';
import {catchError, exhaustMap, switchMap, map, withLatestFrom} from 'rxjs/operators';
import {backendErrorOccurred} from './alert.actions';
import {of} from 'rxjs';
import {IReservation, IServer, IDeploySearchResult, Buildz} from './model';
import {select, Store} from '@ngrx/store';
import {theDeploySearchParams} from './selectors';

@Injectable()
export class ServersEffects {

  LOAD_KNOWN_SERVERS$ = createEffect(() => this.actions$.pipe(
      ofType(LOAD_KNOWN_SERVERS),
      exhaustMap(() => this.http.get<IServer[]>('/api/v1/servers').pipe(
        map((servers: IServer[]) => LOAD_KNOWN_SERVERS_OK({ servers })),
        catchError(errorResponse => of(backendErrorOccurred({ errorResponse })))
      ))
    )
  );

  DEPLOY_SEARCH$ = createEffect(() => this.actions$.pipe(
    ofType(DEPLOY_SEARCH),
    withLatestFrom(this.store.pipe(select(theDeploySearchParams))),
    exhaustMap(([action, searchParams]) => this.http.post<IDeploySearchResult>(
        `/api/v1/deploys/on/${action.serverName}`,
      // the pagination tag starts at 1 and the API starts at 0, so subtract 1 before sending
      // search parameters to API.
      { ...searchParams, page: (searchParams.page - 1)}
      ).pipe(
        map((result: IDeploySearchResult) => DEPLOY_SEARCH_OK({serverName: action.serverName, result})),
        catchError(errorResponse => of(backendErrorOccurred({errorResponse})))
      )
    )
  ));

  RESERVE_SERVER$ = createEffect(() => this.actions$.pipe(
    ofType(RESERVE_SERVER),
    switchMap((action) => this.http.post<IReservation>(
      `/api/v1/servers/${action.event.serverName}/reservation`,
      action.event.reservation
    ).pipe(
      map((reservation: IReservation) => RESERVE_SERVER_OK({serverName: action.event.serverName, reservation})),
      catchError(errorResponse => of(backendErrorOccurred({errorResponse})))
    ))
  ));

  RELEASE_SERVER$ = createEffect(() => this.actions$.pipe(
    ofType(RELEASE_SERVER),
    exhaustMap((action) => this.http.delete(`/api/v1/servers/${action.serverName}/reservation`).pipe(
      map(() => RELEASE_SERVER_OK({serverName: action.serverName})),
      catchError(errorResponse => of(backendErrorOccurred({errorResponse})))
    ))
  ));

  constructor(
      private actions$: Actions,
      private http: HttpClient,
      private store: Store<Buildz>
  ) {}
}
