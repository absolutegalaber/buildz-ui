import {Component} from '@angular/core';
import {ProjectsApi} from '../service/projects-api.service';

@Component({
  template: `
    <ng-container *ngIf="projectsApi.data | async as theData">
      <div class="row">
        <div class="col-12">
          <button class="btn" (click)="projectsApi.toggleIncludeInactive()">
            <fa-icon icon="toggle-on" *ngIf="theData.inactiveIncluded"></fa-icon>
            <fa-icon icon="toggle-off" *ngIf="!theData.inactiveIncluded"></fa-icon>
            Inactive Projects and Branches visible?
          </button>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-6">
          <bz-project-list
            [projects]="theData.projects"
            (projectSelected)="projectsApi.selectProject($event)"
          >
          </bz-project-list>
        </div>
        <div class="col-6">
          <bz-branch-list
            [project]="theData.currentProject"
            [branches]="theData.branchesOf"
            (branchSelected)="projectsApi.selectBranch($event)"
          >
          </bz-branch-list>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-12">
          <bz-set-active
            [includeInactive]="theData.inactiveIncluded"
            [project]="theData.currentProject"
            [branch]="theData.currentBranch"
            (toggleBranchActive)="projectsApi.toggleBranchActive()"
            (toggleProjectActive)="projectsApi.toggleProjectActive()"
          ></bz-set-active>
        </div>
      </div>
    </ng-container>
  `
})
export class ManagementPage {
  constructor(public projectsApi: ProjectsApi) {
  }
}
