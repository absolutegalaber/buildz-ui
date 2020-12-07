import {Component} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Buildz} from '../core/flux-store/model';
import {selectBranch, selectProject, toggleCurrentBranchActive, toggleCurrentProjectActive, toggleInactiveProjectsVisible} from '../core/flux-store/projects.actions';
import {currentProjectWithBranches, includeInactiveProjects, projectNames, selectedProjectAndBranch} from '../core/flux-store/selectors';

@Component({
  template: `
    <div class="row">
      <div class="col-12">
        <button class="btn" (click)="toggleInactiveProjects()">
          <fa-icon icon="toggle-on" *ngIf="(inactiveProjectsIncluded | async)"></fa-icon>
          <fa-icon icon="toggle-off" *ngIf="!(inactiveProjectsIncluded | async)"></fa-icon>
          Inactive Projects and Branches visible?
        </button>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-6">
        <bz-project-list
          [projects]="projectNames | async"
          (projectSelected)="selectCurrentProject($event)"
        >
        </bz-project-list>
      </div>
      <div class="col-6">
        <bz-branch-list
          [projectWithBranches]="currentProjectWithBranches | async"
          (branchSelected)="selectCurrentBranch($event)"
        >
        </bz-branch-list>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-12">
        <bz-set-active
          [selectedProjectAndBranch]="selectedProjectAndBranch | async"
          (toggleBranchActive)="toggleCurrentBranch()"
          (toggleProjectActive)="toggleCurrentProject()"
        ></bz-set-active>
      </div>
    </div>
  `
})
export class ManagementPage {
  projectNames = this.store.pipe(select(projectNames))
  currentProjectWithBranches = this.store.pipe(select(currentProjectWithBranches))
  inactiveProjectsIncluded = this.store.pipe(select(includeInactiveProjects))
  selectedProjectAndBranch = this.store.pipe(select(selectedProjectAndBranch))

  toggleInactiveProjects() {
    this.store.dispatch(toggleInactiveProjectsVisible())
  }

  selectCurrentProject(projectName: string) {
    this.store.dispatch(selectProject({projectName}))
  }

  selectCurrentBranch(branchName: string) {
    this.store.dispatch(selectBranch({branchName}))
  }

  toggleCurrentProject() {
    this.store.dispatch(toggleCurrentProjectActive())
  }

  toggleCurrentBranch() {
    this.store.dispatch(toggleCurrentBranchActive())
  }

  constructor(private store: Store<Buildz>) {
  }
}
