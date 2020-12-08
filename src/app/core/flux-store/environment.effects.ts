import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {HttpClient} from '@angular/common/http';
import {deleteEnvironment, environmentBuildsLoaded, environmentSelected, loadEnvironmentBuilds, loadSingleEnvironment, saveEnvironment, singleEnvironmentLoaded, updateCurrentEnvironment} from './environment.actions';
import {catchError, map, mergeMap, mergeMapTo, switchMap, withLatestFrom} from 'rxjs/operators';
import {Buildz, IEnvironment, IEnvironmentBuilds} from './model';
import {Action, select, Store} from '@ngrx/store';
import {currentEnvironment, verificationArtifacts} from './selectors';
import {of} from 'rxjs';
import {backendErrorOccurred, frontendInfo} from './alert.actions';
import {loadBuildStats} from './build-stats.actions';

@Injectable()
export class EnvironmentEffects {

  buildsOf$ = createEffect(() => this.actions$.pipe(
    ofType(loadEnvironmentBuilds),
    map((action) => action.environmentName),
    switchMap((environmentName) => this.http.get<IEnvironmentBuilds>(`/api/v1/builds/of-environment/${environmentName}`).pipe(
      mergeMap((environmentBuilds: IEnvironmentBuilds) => [
        environmentBuildsLoaded({environmentBuilds}),
        environmentSelected({environmentName: environmentBuilds.environment})]
      ),
      catchError(err => of(backendErrorOccurred(err)))
    ))
  ))

  loadSingleEnvironment$ = createEffect(() => this.actions$.pipe(
    ofType(loadSingleEnvironment),
    map((action) => action.environmentName),
    switchMap((environmentName) => this.http.get<IEnvironment>(`/api/v1/environments/${environmentName}`).pipe(
      map((environment: IEnvironment) => singleEnvironmentLoaded({environment})),
      catchError(err => of(backendErrorOccurred(err)))
    ))
  ))

  verifyBuildsOfEnv$ = createEffect(() => this.actions$.pipe(
    ofType(updateCurrentEnvironment),
    withLatestFrom(this.store.pipe(select(verificationArtifacts))),
    switchMap(([action, artifacts]) => this.http.post<IEnvironmentBuilds>(`/api/v1/environments/verify-artifacts`, artifacts).pipe(
      map((environmentBuilds: IEnvironmentBuilds) => environmentBuildsLoaded({environmentBuilds})),
      catchError(err => of(backendErrorOccurred(err)))
    ))
  ))

  saveEnvironment$ = createEffect(() => this.actions$.pipe(
    ofType(saveEnvironment),
    withLatestFrom(this.store.pipe(select(currentEnvironment))),
    switchMap(([action, environment]: [Action, IEnvironment]) => this.http.post<IEnvironment>(`/api/v1/environments`, environment).pipe(
      mergeMap((environment: IEnvironment) => [
        singleEnvironmentLoaded({environment}),
        loadBuildStats(),
        frontendInfo({
          alertMessage: {
            heading: 'Environment Saved',
            message: `Successfully saved the Environment with name='${environment.name}'. {DB-ID=${environment.id}}`
          }
        })
      ]),
      catchError(err => of(backendErrorOccurred(err)))
    ))
  ))

  deleteEnvironment$ = createEffect(() => this.actions$.pipe(
    ofType(deleteEnvironment),
    withLatestFrom(this.store.pipe(select(currentEnvironment))),
    switchMap(([action, environment]: [Action, IEnvironment]) => this.http.delete(`/api/v1/environments/${environment.name}`).pipe(
      mergeMapTo([
          frontendInfo({
            alertMessage: {
              heading: 'Environment Deleted',
              message: `Successfully deleted the Environment with name='${environment.name}'`
            }
          }),
          loadBuildStats()
        ]
      ),
      catchError(err => of(backendErrorOccurred(err)))
    ))
  ))

  constructor(private actions$: Actions, private http: HttpClient, private store: Store<Buildz>) {
  }
}
