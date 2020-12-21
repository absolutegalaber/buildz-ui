import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {HttpClient} from '@angular/common/http';
import {LOAD_SERVER_DEPLOYS, LOAD_SERVER_DEPLOYS_OK, LOAD_KNOWN_SERVERS, LOAD_KNOWN_SERVERS_OK} from './server.actions';
import {catchError, exhaustMap, switchMap, map, withLatestFrom} from 'rxjs/operators';
import {backendErrorOccurred} from './alert.actions';
import {of} from 'rxjs';
import {IDeploy, IServer} from './model';

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

  constructor(
      private actions$: Actions,
      private http: HttpClient
  ) {}
}
