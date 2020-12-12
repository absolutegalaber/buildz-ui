import {Component} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Buildz, IProject, IProjectBranch} from '../core/flux-store/model';
import {setProjectActive, setProjectBranchActive, toggleInactiveProjectsVisible} from '../core/flux-store/projects.actions';
import {includeInactiveProjects, theCurrentProjectWithBranches, theProjects, theSelectedProjectAndBranch} from '../core/flux-store/selectors';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmDialog} from '../dialogs/confirm.dialog';

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
      <div class="col-10 offset-1">
        <bz-project-accordion
          [projects]="projectData | async"
          (projectSelected)="toggleCurrentProject($event)"
          (branchSelected)="toggleCurrentBranch($event)"
        >
        </bz-project-accordion>
      </div>
    </div>
  `
})
export class ManagementPage {
  projectData = this.store.pipe(select((state: Buildz) => state.projects))
  projects = this.store.pipe(select(theProjects))
  currentProjectWithBranches = this.store.pipe(select(theCurrentProjectWithBranches))
  inactiveProjectsIncluded = this.store.pipe(select(includeInactiveProjects))
  selectedProjectAndBranch = this.store.pipe(select(theSelectedProjectAndBranch))

  toggleInactiveProjects() {
    this.store.dispatch(toggleInactiveProjectsVisible())
  }

  toggleCurrentProject(project: IProject) {
    let question = `Are you sure you want to ${project.active ? 'HIDE' : 'SHOW'} the project <b>'${project.name}'</b>.`
    let confirmation = this.ngbModal.open(ConfirmDialog)
    confirmation.componentInstance.question = question
    confirmation.result.then(() => {
      this.store.dispatch(setProjectActive({project}))
    })
  }

  toggleCurrentBranch(projectBranch: IProjectBranch) {
    let question = `Are you sure you want to ${projectBranch.active ? 'HIDE' : 'SHOW'} the project '<b>${projectBranch.branchName}</b>' of project '<b>${projectBranch.projectName}</b>'.`
    let confirmation = this.ngbModal.open(ConfirmDialog)
    confirmation.componentInstance.question = question
    confirmation.result.then(() => {
      this.store.dispatch(setProjectBranchActive({projectBranch}))
    })
  }

  constructor(private store: Store<Buildz>, private ngbModal: NgbModal) {
  }
}
