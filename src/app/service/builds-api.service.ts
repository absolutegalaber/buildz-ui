import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Build, BuildSearch, BuildSearchResult, BuildStats, DEFAULT_BUILD_SEARCH, EnvironmentBuilds} from './domain';
import {Observable, ReplaySubject, Subject} from 'rxjs';

@Injectable()
export class BuildsApi {
  private _currentBuildSearch: BuildSearch = DEFAULT_BUILD_SEARCH;
  private _currentBuildSearchResult: BuildSearchResult;
  private _currentEnvironmentBuilds: EnvironmentBuilds;

  private _buildSearch: Subject<BuildSearch> = new ReplaySubject();
  private _buildSearchResult: Subject<BuildSearchResult> = new ReplaySubject();
  private _selectedBuild: Subject<Build> = new ReplaySubject();
  private _environmentBuilds: Subject<EnvironmentBuilds> = new ReplaySubject();

  constructor(private htto: HttpClient) {
    this._buildSearch.next(this._currentBuildSearch);
  }

  get environmentBuilds(): Subject<EnvironmentBuilds> {
    return this._environmentBuilds;
  }

  get buildSearch(): Subject<BuildSearch> {
    return this._buildSearch;
  }

  get buildSearchResult(): Subject<BuildSearchResult> {
    return this._buildSearchResult;
  }

  get selectedBuild(): Subject<Build> {
    return this._selectedBuild;
  }

  stats(): Observable<BuildStats> {
    return this.htto.get<BuildStats>(`/api/v1/builds/stats`)
  }

  projectSelected(projectName: string): void {
    let theSearch = DEFAULT_BUILD_SEARCH;
    theSearch.project = projectName;
    this._buildSearch.next(theSearch);
    this.search()
  }

  search() {
    this.htto.post<BuildSearchResult>(`/api/v1/builds/search`, this._currentBuildSearch)
      .subscribe((theResult: BuildSearchResult) => {
        this._currentBuildSearchResult = theResult;
        this._buildSearchResult.next(theResult);
      });
    this.selectBuild(null)

  }

  nextPage() {
    if (this._currentBuildSearch.page < this._currentBuildSearchResult.totalPages)
      this._currentBuildSearch.page++;
    this._buildSearch.next(this._currentBuildSearch)
    this.htto.post<BuildSearchResult>(`/api/v1/builds/search`, this._currentBuildSearch)
      .subscribe((theResult: BuildSearchResult) =>
        this._buildSearchResult.next(theResult)
      );
    this.selectBuild(null)

  }

  previousPage() {
    if (this._currentBuildSearch.page > 0) {
      this._currentBuildSearch.page--;
      this._buildSearch.next(this._currentBuildSearch)
      this.htto.post<BuildSearchResult>(`/api/v1/builds/search`, this._currentBuildSearch)
        .subscribe((theResult: BuildSearchResult) =>
          this._buildSearchResult.next(theResult)
        );
      this.selectBuild(null)
    }
  }

  selectBuild(newSelected: Build) {
    this.selectedBuild.next(newSelected);
  }

  loadEnvironment(newSelectedEnvironmentName: string): Observable<EnvironmentBuilds> {
    this.htto.get<EnvironmentBuilds>(`/api/v1/builds/of-environment/${newSelectedEnvironmentName}`)
      .subscribe((environmentBuilds: EnvironmentBuilds) => {
        this._currentEnvironmentBuilds = environmentBuilds;
        this._environmentBuilds.next(this._currentEnvironmentBuilds)
      });
    return this.environmentBuilds
  }
}
