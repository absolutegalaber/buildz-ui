import {Component} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Buildz, IBranch, IProject} from '../core/flux-store/model';
import {selectBranch, selectProject, toggleCurrentBranchActive, toggleCurrentProjectActive, toggleInactiveProjectsVisible} from '../core/flux-store/projects.actions';
import {currentProjectWithBranches, includeInactiveProjects, selectedProjectAndBranch, theProjects} from '../core/flux-store/selectors';

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
      <div class="col-8">
        <bz-project-accordion
          [projects]="projectData | async"
          (projectSelected)="selectCurrentProject($event)"
          (branchSelected)="selectCurrentBranch($event)"
        >
        </bz-project-accordion>
      </div>
      <div class="col-4">
        <bz-set-active
          [selectedProjectAndBranch]="selectedProjectAndBranch | async"
          (toggleProjectActive)="toggleCurrentProject()"
          (toggleBranchActive)="toggleCurrentBranch()"
        ></bz-set-active>
      </div>
    </div>
  `
})
export class ManagementPage {
  projectData = this.store.pipe(select((state: Buildz) => state.projects))
  projects = this.store.pipe(select(theProjects))
  currentProjectWithBranches = this.store.pipe(select(currentProjectWithBranches))
  inactiveProjectsIncluded = this.store.pipe(select(includeInactiveProjects))
  selectedProjectAndBranch = this.store.pipe(select(selectedProjectAndBranch))

  toggleInactiveProjects() {
    this.store.dispatch(toggleInactiveProjectsVisible())
  }

  selectCurrentProject(project: IProject) {
    this.store.dispatch(selectProject({project}))
  }

  selectCurrentBranch(branch: IBranch) {
    this.store.dispatch(selectBranch({branch}))
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
