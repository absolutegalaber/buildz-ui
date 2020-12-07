import {Component} from '@angular/core';
import {BuildzApi} from '../service/builds-api.service';
import {ProjectsApi} from '../service/projects-api.service';

@Component({
  template: `
    <ng-container *ngIf="searchResult|async as theSearchResult">
      <div class="container-fluid">
        <div class="row">
          <div class="col">
            <bz-build-search-form
              [theSearch]="search | async"
              [theSearchResult]="theSearchResult"
              [projectData]="projectsApi.data | async"
              (doSearch)="client.update()"
              (resetSearch)="client.resetSearch()"
              (addLabel)="client.addLabel($event)"
              (clearLabels)="client.clearLabel($event)"
              (toPage)="client.toPage($event)"
            >
            </bz-build-search-form>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-10 offset-1">
            <bz-builds-accordion
              [searchResult]="theSearchResult.builds"
              (buildSelected)="client.selectBuild($event)"
            ></bz-builds-accordion>
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

  constructor(public client: BuildzApi, public projectsApi: ProjectsApi) {
  }
}
