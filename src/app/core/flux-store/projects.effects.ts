import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {loadProjects, projectsLoaded, toggleCurrentBranchActive, toggleCurrentProjectActive, toggleInactiveProjectsVisible} from './projects.actions';
import {HttpClient} from '@angular/common/http';
import {Buildz, IProjectsResponse} from './model';
import {catchError, exhaustMap, map, mergeMapTo, switchMap, withLatestFrom} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {currentProject, includeInactiveProjects, selectedProjectAndBranch} from './selectors';
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
      catchError(err => of(backendErrorOccurred(err)))
      )
    )
  ))

  // noinspection JSUnusedLocalSymbols
  toggleProjectActive = createEffect(() => this.actions$.pipe(
    ofType(toggleCurrentProjectActive),
    withLatestFrom(this.store.pipe(select(currentProject))),
    map(([action, project]) => {
      return {
        projectName: project.name,
        active: !project.active
      }
    }),
    exhaustMap((projectStatus) => this.http.post<void>(`/api/v1/projects/project-branch-activa`, {...projectStatus}).pipe(
      mergeMapTo([
        loadProjects(),
        frontendInfo({
          alertMessage: {
            heading: 'Success',
            message: 'Project updated'
          }
        })
      ]),
      catchError(err => of(backendErrorOccurred(err)))
      )
    )
  ))

  // noinspection JSUnusedLocalSymbols
  toggleBranchActive$ = createEffect(() => this.actions$.pipe(
    ofType(toggleCurrentBranchActive),
    withLatestFrom(this.store.pipe(select(selectedProjectAndBranch))),
    map(([action, projectAndBranch]) => {
      return {
        projectName: projectAndBranch.project.name,
        branch: projectAndBranch.branch.name,
        active: !projectAndBranch.branch.active
      }
    }),
    exhaustMap((projectAndBranchStatus) => this.http.post<void>(`/api/v1/projects/project-branch-activa`, {...projectAndBranchStatus}).pipe(
      mergeMapTo([
        loadProjects(),
        frontendInfo({
          alertMessage: {
            heading: 'Success',
            message: 'Branch updated'
          }
        })
      ]),
      catchError(err => of(backendErrorOccurred(err)))
      )
    )
  ))

  constructor(private actions$: Actions, private http: HttpClient, private store: Store<Buildz>) {
  }
}

