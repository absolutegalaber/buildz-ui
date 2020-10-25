import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Build, BuildSearch, BuildSearchResult, BuildStats, DEFAULT_BUILD_SEARCH, EMTPY_BUILD_SEARCH_RESULT, EnvironmentBuilds, SearchLabel} from './domain';
import {BehaviorSubject, Observable, ReplaySubject, Subject} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';

@Injectable()
export class BuildzApi {
  private _currentBuildSearch: BuildSearch = DEFAULT_BUILD_SEARCH;
  private _currentBuildSearchResult: BuildSearchResult = EMTPY_BUILD_SEARCH_RESULT;
  private _currentEnvironmentBuilds: EnvironmentBuilds;

  private _buildSearch: Subject<BuildSearch> = new BehaviorSubject(this._currentBuildSearch);
  private _buildSearchResult = this.buildSearch.pipe(
    switchMap((theSearch: BuildSearch) =>
      this.httpClient.post<BuildSearchResult>(`/api/v1/builds/search`, theSearch).pipe(
        tap((result: BuildSearchResult) => this._currentBuildSearchResult = result)
      )
    ));


  private _selectedBuild: Subject<Build> = new ReplaySubject();
  private _environmentBuilds: Subject<EnvironmentBuilds> = new ReplaySubject();

  get environmentBuilds(): Subject<EnvironmentBuilds> {
    return this._environmentBuilds;
  }

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

  loadEnvironment(newSelectedEnvironmentName: string): Observable<EnvironmentBuilds> {
    this.httpClient.get<EnvironmentBuilds>(`/api/v1/builds/of-environment/${newSelectedEnvironmentName}`)
      .subscribe((environmentBuilds: EnvironmentBuilds) => {
        this._currentEnvironmentBuilds = environmentBuilds;
        this._environmentBuilds.next(this._currentEnvironmentBuilds)
      });
    return this.environmentBuilds
  }

  constructor(private httpClient: HttpClient) {
  }
}
