import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {HttpClient} from '@angular/common/http';
import {environmentBuildsLoaded, environmentSelected, loadEnvironmentBuilds, loadSingleEnvironment, singleEnvironmentLoaded} from './environment.actions';
import {map, mergeMap, switchMap} from 'rxjs/operators';
import {IEnvironment, IEnvironmentBuilds} from './model';

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

  constructor(private actions$: Actions, private http: HttpClient) {
  }
}
