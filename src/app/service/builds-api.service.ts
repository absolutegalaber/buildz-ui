import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Build, BuildSearch, BuildSearchResult, BuildStats, DEFAULT_BUILD_SEARCH, EMTPY_BUILD_SEARCH_RESULT, SearchLabel} from './domain';
import {BehaviorSubject, Observable, of, ReplaySubject, Subject} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {BuildzAlert} from './buildz-alert.state';

@Injectable()
export class BuildzApi {
  private _currentBuildSearch: BuildSearch = DEFAULT_BUILD_SEARCH;
  private _currentBuildSearchResult: BuildSearchResult = EMTPY_BUILD_SEARCH_RESULT;

  private _buildSearch: Subject<BuildSearch> = new BehaviorSubject(this._currentBuildSearch);
  private _buildSearchResult = this.buildSearch.pipe(
    switchMap((theSearch: BuildSearch) =>
      this.httpClient.post<BuildSearchResult>(`/api/v1/builds/search`, theSearch).pipe(
        tap((result: BuildSearchResult) => this._currentBuildSearchResult = result),
        catchError((errorResponse: HttpErrorResponse) => {
          this.buildzAlert.errorOccurred(errorResponse);
          return of(EMTPY_BUILD_SEARCH_RESULT);
        })
      )
    ));


  private _selectedBuild: Subject<Build> = new ReplaySubject();

  get buildSearch(): Subject<BuildSearch> {
    return this._buildSearch;
  }

  get buildSearchResult(): Observable<BuildSearchResult> {
    return this._buildSearchResult;
  }

  get selectedBuild(): Subject<Build> {
    return this._selectedBuild;
  }

  stats(): Observable<BuildStats> {
    return this.httpClient.get<BuildStats>(`/api/v1/builds/stats`)
  }

  projectSelected(projectName: string): void {
    this._currentBuildSearch = DEFAULT_BUILD_SEARCH;
    this._currentBuildSearch.project = projectName;
    this.update()
  }

  update(): void {
    this.selectBuild(null)
    this.buildSearch.next(this._currentBuildSearch)
  }

  nextPage() {
    if (this._currentBuildSearch.page + 1 < this._currentBuildSearchResult.totalPages) {
      this._currentBuildSearch.page += 1;
      this.update()
    }
  }

  previousPage() {
    if (this._currentBuildSearch.page > 0) {
      this._currentBuildSearch.page--;
      this._buildSearch.next(this._currentBuildSearch)
      this.update()
    }
  }

  addLabel(newLabel: SearchLabel) {
    this._currentBuildSearch.labels[newLabel.key] = newLabel.value
    this.update()
  }

  clearLabel(labelKey: string) {
    delete this._currentBuildSearch.labels[labelKey]
    this.update()
  }

  selectBuild(newSelected: Build) {
    this.selectedBuild.next(newSelected);
  }

  constructor(private httpClient: HttpClient, private buildzAlert: BuildzAlert) {
  }
}
