import {Component} from '@angular/core';
import {BuildzApi} from '../service/builds-api.service';
import {BuildzData} from '../service/buildz-data.state';

@Component({
  template: `
    <ng-container *ngIf="searchResult|async as theSearchResult">
      <div class="container-fluid">
        <div class="row">
          <div class="col">
            <bz-build-search-form
              [theSearch]="search | async"
              [theSearchResult]="theSearchResult"
              [buildzData]="buildzData.data | async"
              (doSearch)="client.update()"
              (addLabel)="client.addLabel($event)"
              (clearLabels)="client.clearLabel($event)"
              (nextPage)="client.nextPage()"
              (previousPage)="client.previousPage()"
            >
            </bz-build-search-form>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-4">
            <bz-build-list
              [searchResult]="theSearchResult"
              (buildSelected)="client.selectBuild($event)"
            ></bz-build-list>
          </div>
          <div class="col-8">
            <bz-build-label-list [build]="selectedBuild | async"></bz-build-label-list>
          </div>
        </div>
      </div>
    </ng-container>
  `
})
export class BuildsPage {
  search = this.client.buildSearch;
  searchResult = this.client.buildSearchResult;
  selectedBuild = this.client.selectedBuild;

  constructor(public client: BuildzApi, public buildzData: BuildzData) {
  }
}
