import {Injectable} from '@angular/core'
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import {EMPTY_BUILD_STATS, EMPTY_PROJECT_DATA, ProjectData} from './domain'
import {BehaviorSubject, of} from 'rxjs'
import {catchError, map, tap} from 'rxjs/operators'
import {BuildzAlert} from './buildz-alert.state'

@Injectable()
export class ProjectsApi {
  private _currentData: ProjectData = EMPTY_PROJECT_DATA
  private _data = new BehaviorSubject<ProjectData>(EMPTY_PROJECT_DATA)

  get data(): BehaviorSubject<ProjectData> {
    return this._data
  }

  selectProject(project: string): void {
    this._currentData.currentProject = project
    this._currentData.currentBranch = ''
    this._currentData.branchesOf = this._currentData.projectBranches[project]
    this.data.next(this._currentData)
  }

  selectBranch(branchName: string): void {
    this._currentData.currentBranch = branchName
    this.data.next(this._currentData)
  }

  toggleIncludeInactive() {
    this.load(!this._currentData.inactiveIncluded)
  }

  load(includingInactive: boolean = false): void {
    this.http.get<ProjectData>(`/api/v1/projects?include-inactive=${includingInactive}`).pipe(
      map((data: ProjectData) => {
        this._currentData = data
        this._currentData.inactiveIncluded = includingInactive
        this._data.next(this._currentData)
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        this.buildzAlert.errorOccurred(errorResponse)
        return of(EMPTY_BUILD_STATS)
      })
    ).subscribe()
  }

  toggleProjectActive() {
    const body = {
      project: this._currentData.currentProject
    }
    this.http.post<void>('/api/v1/projects/toggle-project-active', body).pipe(
      tap(() => this.load(this._currentData.inactiveIncluded)),
      catchError((errorResponse) => {
        this.buildzAlert.errorOccurred(errorResponse)
        return of(EMPTY_BUILD_STATS)
      })
    ).subscribe()
  }

  toggleBranchActive() {
    const body = {
      project: this._currentData.currentProject,
      branch: this._currentData.currentBranch
    }
    this.http.post<void>('/api/v1/projects/toggle-branch-active', body).pipe(
      tap(() => this.load(this._currentData.inactiveIncluded)),
      catchError((errorResponse) => {
        this.buildzAlert.errorOccurred(errorResponse)
        return of(EMPTY_BUILD_STATS)
      })
    ).subscribe()
  }

  constructor(private http: HttpClient, private buildzAlert: BuildzAlert) {
  }
}
