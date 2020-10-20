import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Build, BuildSearch, BuildSearchResult, BuildStats, DEFAULT_BUILD_SEARCH} from './domain';
import {Observable, ReplaySubject, Subject} from 'rxjs';

@Injectable()
export class BuildsClientService {
  private _buildSearchParameters: BuildSearch = DEFAULT_BUILD_SEARCH;
  private _buildSearchResultData: BuildSearchResult;

  private _buildSearch: Subject<BuildSearch> = new ReplaySubject();
  private _buildSearchResult: Subject<BuildSearchResult> = new ReplaySubject();
  private _selectedBuild: Subject<Build> = new ReplaySubject();

  constructor(private htto: HttpClient) {
    this._buildSearch.next(this._buildSearchParameters);
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
  }

  search() {
    this.htto.post<BuildSearchResult>(`/api/v1/builds/search`, this._buildSearchParameters)
      .subscribe((theResult: BuildSearchResult) => {
        this._buildSearchResultData = theResult;
        this._buildSearchResult.next(theResult);
      });
    this.selected(null)

  }

  nextPage() {
    if (this._buildSearchParameters.page < this._buildSearchResultData.totalPages)
      this._buildSearchParameters.page++;
    this._buildSearch.next(this._buildSearchParameters)
    this.htto.post<BuildSearchResult>(`/api/v1/builds/search`, this._buildSearchParameters)
      .subscribe((theResult: BuildSearchResult) =>
        this._buildSearchResult.next(theResult)
      );
    this.selected(null)

  }

  previousPage() {
    if (this._buildSearchParameters.page > 0) {
      this._buildSearchParameters.page--;
      this._buildSearch.next(this._buildSearchParameters)
      this.htto.post<BuildSearchResult>(`/api/v1/builds/search`, this._buildSearchParameters)
        .subscribe((theResult: BuildSearchResult) =>
          this._buildSearchResult.next(theResult)
        );
      this.selected(null)
    }
  }

  selected(newSelected: Build) {
    this.selectedBuild.next(newSelected);
  }
}
