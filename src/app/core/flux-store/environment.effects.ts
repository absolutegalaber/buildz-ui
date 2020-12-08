import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {HttpClient} from '@angular/common/http';
import {environmentBuildsLoaded, environmentSelected, loadEnvironmentBuilds, loadSingleEnvironment, saveEnvironment, singleEnvironmentLoaded, updateCurrentEnvironment} from './environment.actions';
import {map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {Buildz, IEnvironment, IEnvironmentBuilds} from './model';
import {Action, select, Store} from '@ngrx/store';
import {currentEnvironment, verificationArtifacts} from './selectors';

@Injectable()
export class EnvironmentEffects {

  buildsOf$ = createEffect(() => this.actions$.pipe(
    ofType(loadEnvironmentBuilds),
    map((action) => action.environmentName),
    switchMap((environmentName) => this.http.get<IEnvironmentBuilds>(`/api/v1/builds/of-environment/${environmentName}`).pipe(
      mergeMap((environmentBuilds: IEnvironmentBuilds) => [
        environmentBuildsLoaded({environmentBuilds}),
        environmentSelected({environmentName: environmentBuilds.environment})]
      ))
    )
  ))

  loadSingleEnvironment$ = createEffect(() => this.actions$.pipe(
    ofType(loadSingleEnvironment),
    map((action) => action.environmentName),
    switchMap((environmentName) => this.http.get<IEnvironment>(`/api/v1/environments/${environmentName}`).pipe(
      map((environment: IEnvironment) => singleEnvironmentLoaded({environment}))
      )
    )
  ))

  verifyBuildsOfEnv$ = createEffect(() => this.actions$.pipe(
    ofType(updateCurrentEnvironment),
    withLatestFrom(this.store.pipe(select(verificationArtifacts))),
    switchMap(([action, artifacts]) => this.http.post<IEnvironmentBuilds>(`/api/v1/environments/verify-artifacts`, artifacts).pipe(
      map((environmentBuilds: IEnvironmentBuilds) => environmentBuildsLoaded({environmentBuilds})
      ))
    )
  ))

  saveEnvironment$ = createEffect(() => this.actions$.pipe(
    ofType(saveEnvironment),
    withLatestFrom(this.store.pipe(select(currentEnvironment))),
    switchMap(([action, environment]: [Action, IEnvironment]) => this.http.post<IEnvironment>(`/api/v1/environments`, environment).pipe(
      map((environment: IEnvironment) => singleEnvironmentLoaded({environment}))
      )
    )
  ))

  constructor(private actions$: Actions, private http: HttpClient, private store: Store<Buildz>) {
  }
}
