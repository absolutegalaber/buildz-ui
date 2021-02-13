import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {HttpClient} from '@angular/common/http';
import {
  LOAD_SERVER_DEPLOYS,
  LOAD_SERVER_DEPLOYS_OK,
  LOAD_KNOWN_SERVERS,
  LOAD_KNOWN_SERVERS_OK,
  RESERVE_SERVER,
  RESERVE_SERVER_OK,
  RELEASE_SERVER,
  RELEASE_SERVER_OK
} from './server.actions';
import {catchError, exhaustMap, switchMap, map} from 'rxjs/operators';
import {backendErrorOccurred} from './alert.actions';
import {of} from 'rxjs';
import {IDeploy, IReservation, IServer} from './model';

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

  LOAD_SERVER_DEPLOYS$ = createEffect(() => this.actions$.pipe(
    ofType(LOAD_SERVER_DEPLOYS),
    switchMap((action) => this.http.get<IDeploy[]>(`/api/v1/deploys/on/${action.name}`).pipe(
      map((data: IDeploy[]) => LOAD_SERVER_DEPLOYS_OK({serverName: action.name, deploys: data})),
      catchError(errorResponse => of(backendErrorOccurred({errorResponse})))
    ))
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
      private http: HttpClient
  ) {}
}
