import {Component} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Buildz, IProject} from '../core/flux-store/model';
import {theBuildStats, theEnvironmentNames, theProjects} from '../core/flux-store/selectors';
import {Observable} from 'rxjs';
import {loadEnvironmentBuilds, newEnvironment} from '../core/flux-store/environment.actions';
import {BuildsOfEnvironmentDialog} from '../dialogs/builds-of-environment.dialog';

@Component({
  template: `
    <div class="row">
      <div class="col text-center">
        <bz-stats [stats]="stats | async"></bz-stats>
      </div>
    </div>

    <div class="row">

      <div class="col-6">
        <bz-project-list
          [projects]="projects | async"
          (projectSelected)="showBuildzOf($event)"
        ></bz-project-list>
      </div>

      <div class="col-6">
        <bz-environment-list
          [environments]="environmentNames | async"
          (environmentSelected)="showBuildsOf($event)"
          (newEnvironment)="newEnvironment()"
        ></bz-environment-list>
      </div>

    </div>
  `
})
export class HomePage {
  projects: Observable<IProject[]> = this.store.pipe(select(theProjects))
  environmentNames = this.store.pipe(select(theEnvironmentNames))
  stats = this.store.pipe(select(theBuildStats))

  showBuildzOf(project: IProject) {
    this.router.navigate(['/builds-of/', project.name])
  }

  showBuildsOf(environmentName: string) {
    this.store.dispatch(loadEnvironmentBuilds({environmentName}));
    this.modelService.open(BuildsOfEnvironmentDialog, {size: 'lg'})
  }

  newEnvironment() {
    this.store.dispatch(newEnvironment());
    this.router.navigate(['new-environment'])
  }

  constructor(private store: Store<Buildz>, private modelService: NgbModal, private router: Router) {
  }
}
