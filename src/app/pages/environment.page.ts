import {Component} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Buildz, IEnvironment} from '../core/flux-store/model';
import {currentEnvironment, environmentBuilds, projects} from '../core/flux-store/selectors';
import {deleteEnvironment, saveEnvironment, updateCurrentEnvironment} from '../core/flux-store/environment.actions';

@Component({
  template: `
    <div class="row">
      <div class="col">
        <bz-environment-form
          [environment]="environment | async | deepClone"
          [verificationResult]="environmentBuilds | async"
          [projects]="projects | async"
          (update)="updateEnvironment($event)"
          (save)="saveEnvironment()"
          (delete)="deleteEnvironment()"
        >
        </bz-environment-form>
      </div>
    </div>
  `
})
export class EnvironmentPage {
  environment = this.store.pipe(select(currentEnvironment))
  environmentBuilds = this.store.pipe(select(environmentBuilds))
  projects = this.store.pipe(select(projects))

  updateEnvironment(environment: IEnvironment) {
    this.store.dispatch(updateCurrentEnvironment({environment}))
  }

  saveEnvironment() {
    this.store.dispatch(saveEnvironment())
  }

  deleteEnvironment() {
    this.store.dispatch(deleteEnvironment())
  }

  constructor(private store: Store<Buildz>) {
  }
}
