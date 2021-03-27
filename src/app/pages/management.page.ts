import {Component} from '@angular/core'
import {select, Store} from '@ngrx/store'
import {Buildz, IProject, IProjectBranch, IServer} from '../core/flux-store/model'
import {setProjectActive, setProjectBranchActive, toggleInactiveProjectsVisible} from '../core/flux-store/projects.actions'
import {includeInactiveProjects, theCurrentProjectWithBranches, theCurrentServer, theProjects, theSelectedProjectAndBranch, theServers} from '../core/flux-store/selectors'
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'
import {ConfirmDialog} from '../dialogs/confirm.dialog'
import {Observable} from 'rxjs'
import {LOAD_SINGLE_SERVER, UPDATE_SERVER} from '../core/flux-store/server.actions'

@Component({
  template: `
    <div class="row">
      <div class="col-10 offset-1">
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
    <hr>
    <div class="row">
      <div class="col-10 offset-1">
        <div class="row">
          <div class="col-6">
            <bz-servers-list
              [servers]="theServers | async"
              (serverSelected)="serverSelected($event)"
            ></bz-servers-list>
          </div>
          <div class="col-6">
            <bz-server-form
              [server]="theCurrentServer | async | deepClone"
              (updateServer)="updateServer($event)"
            ></bz-server-form>
          </div>
        </div>
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
  theServers: Observable<IServer[]> = this.store.pipe(select(theServers))
  theCurrentServer: Observable<IServer> = this.store.pipe(select(theCurrentServer))

  toggleInactiveProjects(): void {
    this.store.dispatch(toggleInactiveProjectsVisible())
  }

  toggleCurrentProject(project: IProject): void {
    const question = `Are you sure you want to ${project.active ? 'HIDE' : 'SHOW'} the project <b>'${project.name}'</b>.`
    const confirmation = this.ngbModal.open(ConfirmDialog)
    confirmation.componentInstance.question = question
    confirmation.result.then(() => {
      this.store.dispatch(setProjectActive({project}))
    })
  }

  toggleCurrentBranch(projectBranch: IProjectBranch): void {
    const question = `Are you sure you want to ${projectBranch.active ? 'HIDE' : 'SHOW'} the project '<b>${projectBranch.branchName}</b>' of project '<b>${projectBranch.projectName}</b>'.`
    const confirmation = this.ngbModal.open(ConfirmDialog)
    confirmation.componentInstance.question = question
    confirmation.result.then(() => {
      this.store.dispatch(setProjectBranchActive({projectBranch}))
    })
  }

  serverSelected(serverName: string): void {
    this.store.dispatch(LOAD_SINGLE_SERVER({serverName}))
  }

  updateServer(server: IServer): void {
    this.store.dispatch(UPDATE_SERVER({server}))
  }

  constructor(private store: Store<Buildz>, private ngbModal: NgbModal) {
  }
}
