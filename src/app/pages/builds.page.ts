import {Component} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Buildz, IBuildSearchParams} from '../core/flux-store/model';
import {buildSearchParams, buildSearchResult, projects} from '../core/flux-store/selectors';
import {resetSearchParams, updateSearchParams} from '../core/flux-store/build-search.actions';

@Component({
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <bz-build-search-form
            [theSearch]="search | async | deepClone"
            [theSearchResult]="searchResult | async"
            [projects]="projects | async"
            (updateSearchParams)="updateSearchParams($event)"
            (resetSearch)="resetSearch()"
          >
          </bz-build-search-form>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-10 offset-1">
          <bz-builds-accordion
            [builds]=" (searchResult | async).builds"
          ></bz-builds-accordion>
        </div>
      </div>
    </div>
  `
})
export class BuildsPage {
  search = this.store.pipe(select(buildSearchParams))
  searchResult = this.store.pipe(select(buildSearchResult))
  projects = this.store.pipe(select(projects))

  updateSearchParams(search: IBuildSearchParams) {
    this.store.dispatch(updateSearchParams({search}))
  }

  resetSearch() {
    this.store.dispatch(resetSearchParams())
  }

  constructor(private store: Store<Buildz>) {
  }
}
