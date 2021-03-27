import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {HttpClient} from '@angular/common/http'
import * as EnvironmentActions from './environment.actions'
import {catchError, exhaustMap, map, mergeMap, mergeMapTo, switchMap, tap, withLatestFrom} from 'rxjs/operators'
import {Buildz, IEnvironment, IEnvironmentBuilds} from './model'
import {select, Store} from '@ngrx/store'
import {theArtifactsToVerify, theCurrentEnvironmentName} from './selectors'
import {of} from 'rxjs'
import {backendErrorOccurred, frontendInfo} from './alert.actions'
import {Router} from '@angular/router'

@Injectable()
export class EnvironmentEffects {

  loadKnownEnvironments$ = createEffect(() => this.actions$.pipe(
    ofType(EnvironmentActions.loadKnownEnvironments),
    exhaustMap(() => this.http.get<IEnvironment[]>(`/api/v1/environments/all`).pipe(
      map((environments: IEnvironment[]) => EnvironmentActions.knownEnvironmentsLoaded({environments}))
    ))
  ))

  buildsOf$ = createEffect(() => this.actions$.pipe(
    ofType(EnvironmentActions.loadEnvironmentBuilds),
    map((action) => action.environmentName),
    switchMap((environmentName) => this.http.get<IEnvironmentBuilds>(`/api/v1/builds/of-environment/${environmentName}`).pipe(
      mergeMap((environmentBuilds: IEnvironmentBuilds) => [
        EnvironmentActions.environmentBuildsLoaded({environmentBuilds}),
        EnvironmentActions.environmentSelected({environmentName: environmentBuilds.environment})]
      ),
      catchError(errorResponse => of(backendErrorOccurred({errorResponse})))
    ))
  ))

  loadSingleEnvironment$ = createEffect(() => this.actions$.pipe(
    ofType(EnvironmentActions.loadSingleEnvironment),
    map((action) => action.environmentName),
    switchMap((environmentName) => this.http.get<IEnvironment>(`/api/v1/environments/${environmentName}`).pipe(
      map((environment: IEnvironment) => EnvironmentActions.singleEnvironmentLoaded({environment})),
      catchError(errorResponse => of(backendErrorOccurred({errorResponse})))
    ))
  ))

  verifyBuildsOfEnv$ = createEffect(() => this.actions$.pipe(
    ofType(EnvironmentActions.updateCurrentEnvironment),
    withLatestFrom(this.store.pipe(select(theArtifactsToVerify))),
    switchMap(([action, artifacts]) => this.http.post<IEnvironmentBuilds>(`/api/v1/environments/verify-artifacts`, artifacts).pipe(
      map((environmentBuilds: IEnvironmentBuilds) => EnvironmentActions.environmentBuildsLoaded({environmentBuilds})),
      catchError(errorResponse => of(backendErrorOccurred({errorResponse})))
    ))
  ))

  saveEnvironment$ = createEffect(() => this.actions$.pipe(
    ofType(EnvironmentActions.saveEnvironment),
    switchMap((action) => this.http.post<IEnvironment>(`/api/v1/environments`, {
      ...action.environment
    }).pipe(
      mergeMap((environment: IEnvironment) => [
        EnvironmentActions.singleEnvironmentLoaded({environment}),
        EnvironmentActions.loadKnownEnvironments(),
        frontendInfo({
          alertMessage: {
            heading: 'Environment Saved',
            message: `Successfully saved the Environment with name='${environment.name}'. {DB-ID=${environment.id}}`
          }
        })
      ]),
      tap(() => this.router.navigate([''])),
      catchError(errorResponse => of(backendErrorOccurred({errorResponse})))
    ))
  ))

  deleteEnvironment$ = createEffect(() => this.actions$.pipe(
    ofType(EnvironmentActions.deleteEnvironment),
    withLatestFrom(this.store.pipe(select(theCurrentEnvironmentName))),
    switchMap(([action, environmentName]) => this.http.delete(`/api/v1/environments/${environmentName}`).pipe(
      mergeMapTo([
          frontendInfo({
            alertMessage: {
              heading: 'Environment Deleted',
              message: `Successfully deleted the Environment with name='${environmentName}'`
            }
          }),
          EnvironmentActions.loadKnownEnvironments()
        ]
      ),
      tap(() => this.router.navigate([''])),
      catchError(errorResponse => of(backendErrorOccurred({errorResponse})))
    ))
  ))

  cloneEnvironment$ = createEffect(() => this.actions$.pipe(
    ofType(EnvironmentActions.cloneCurrentEnvironment),
    withLatestFrom(this.store.select(theCurrentEnvironmentName)),
    map(([action, environmentName]) => environmentName),
    exhaustMap((environmentName) => this.http.get<IEnvironment>(`/api/v1/environments/${environmentName}`).pipe(
      map((environment: IEnvironment) => EnvironmentActions.environmentToCloneLoaded({environment})),
      tap(() => this.router.navigate(['new-environment'])),
      catchError(errorResponse => of(backendErrorOccurred({errorResponse})))
    ))
  ))

  constructor(private actions$: Actions, private http: HttpClient, private store: Store<Buildz>, private router: Router) {
  }
}
