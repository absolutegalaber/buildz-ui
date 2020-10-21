import {Component} from '@angular/core';
import {BuildsApi} from '../service/builds-api.service';
import {Build} from '../service/domain';

@Component({
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col-3">
          <bz-build-search-form
            [theSearch]="search | async"
            (doSearch)="client.search()"
          >

          </bz-build-search-form>
        </div>
        <div class="col-4">
          <bz-build-list
            [searchResult]="result | async"
            (buildSelected)="buildSelected($event)"
            (previousPage)="client.previousPage()"
            (nextPage)=" client.nextPage()"
          ></bz-build-list>
        </div>
        <div class="col-5">
          <bz-build-label-list [build]="selectedBuild | async"></bz-build-label-list>
        </div>
      </div>
    </div>
  `
})
export class BuildsPage {
  search = this.client.buildSearch;
  result = this.client.buildSearchResult;
  selectedBuild = this.client.selectedBuild;

  buildSelected(build: Build) {
    this.client.selectBuild(build)
  }

  constructor(public client: BuildsApi) {
  }
}
