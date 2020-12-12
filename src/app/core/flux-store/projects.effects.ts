import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {loadProjects, projectsLoaded, setProjectActive, setProjectBranchActive, toggleInactiveProjectsVisible} from './projects.actions';
import {HttpClient} from '@angular/common/http';
import {Buildz, IProjectsResponse} from './model';
import {catchError, exhaustMap, map, mergeMapTo, switchMap, withLatestFrom} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {includeInactiveProjects} from './selectors';
import {backendErrorOccurred, frontendInfo} from './alert.actions';
import {of} from 'rxjs';

@Injectable()
export class ProjectsEffects {

  // noinspection JSUnusedLocalSymbols
  loadProjects$ = createEffect(() => this.actions$.pipe(
    ofType(loadProjects, toggleInactiveProjectsVisible),
    withLatestFrom(this.store.pipe(select(includeInactiveProjects))),
    switchMap(([action, includingInactive]) => this.http.get<IProjectsResponse>(`/api/v1/projects?include-inactive=${includingInactive}`).pipe(
      map((data: IProjectsResponse) => projectsLoaded({projectsResponse: data})),
      catchError(errorResponse => of(backendErrorOccurred({errorResponse})))
      )
    )
  ))

  // noinspection JSUnusedLocalSymbols
  toggleProjectActive = createEffect(() => this.actions$.pipe(
    ofType(setProjectActive),
    exhaustMap((action) => this.http.post<void>(`/api/v1/projects/project-branch-active`, {
        projectName: action.project.name,
        active: !action.project.active,
      }).pipe(
      mergeMapTo([
        loadProjects(),
        frontendInfo({
          alertMessage: {
            heading: 'Success',
            message: 'Project updated'
          }
        })
      ]),
      catchError(errorResponse => of(backendErrorOccurred({errorResponse})))
      )
    )
  ))

  // noinspection JSUnusedLocalSymbols
  toggleBranchActive$ = createEffect(() => this.actions$.pipe(
    ofType(setProjectBranchActive),
    exhaustMap((action) => this.http.post<void>(`/api/v1/projects/project-branch-active`, {
        projectName: action.projectBranch.projectName,
        branchName: action.projectBranch.branchName,
        active: !action.projectBranch.active,
      }).pipe(
      mergeMapTo([
        loadProjects(),
        frontendInfo({
          alertMessage: {
            heading: 'Success',
            message: 'Branch updated'
          }
        })
      ]),
      catchError(errorResponse => of(backendErrorOccurred({errorResponse})))
      )
    )
  ))

  constructor(private actions$: Actions, private http: HttpClient, private store: Store<Buildz>) {
  }
}

