import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {loadProjects, projectsLoaded, toggleCurrentBranchActive, toggleCurrentProjectActive, toggleInactiveProjectsVisible} from './projects.actions';
import {HttpClient} from '@angular/common/http';
import {Buildz, IProjectsResponse} from './model';
import {map, mapTo, switchMap, withLatestFrom} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {currentProject, includeInactiveProjects, selectedProjectAndBranch} from './selectors';

@Injectable()
export class ProjectsEffects {

  // noinspection JSUnusedLocalSymbols
  loadProjects$ = createEffect(() => this.actions$.pipe(
    ofType(loadProjects, toggleInactiveProjectsVisible),
    withLatestFrom(this.store.pipe(select(includeInactiveProjects))),
    switchMap(([action, includingInactive]) => this.http.get<IProjectsResponse>(`/api/v1/projects?include-inactive=${includingInactive}`).pipe(
      map((data: IProjectsResponse) => projectsLoaded({projectsResponse: data}))
      )
    )
  ))

  // noinspection JSUnusedLocalSymbols
  toggleProjectActive = createEffect(() => this.actions$.pipe(
    ofType(toggleCurrentProjectActive),
    withLatestFrom(this.store.pipe(select(currentProject))),
    switchMap(([action, project]) => this.http.post<void>(`/api/v1/projects/toggle-project-active`, {project}).pipe(
      mapTo(loadProjects())
      )
    )
  ))

  // noinspection JSUnusedLocalSymbols
  toggleBranchActive$ = createEffect(() => this.actions$.pipe(
    ofType(toggleCurrentBranchActive),
    withLatestFrom(this.store.pipe(select(selectedProjectAndBranch))),
    switchMap(([action, projectAndBranch]) => this.http.post<void>(`/api/v1/projects/toggle-branch-active`, {...projectAndBranch}).pipe(
      mapTo(loadProjects())
      )
    )
  ))

  constructor(private actions$: Actions, private http: HttpClient, private store: Store<Buildz>) {
  }
}

