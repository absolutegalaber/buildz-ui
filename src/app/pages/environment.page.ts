import {Component} from '@angular/core'
import {select, Store} from '@ngrx/store'
import {Buildz, IArtifactBuildLabel, IBuildLabel, IEnvironment} from '../core/flux-store/model'
import {theCurrentEnvironment, theEnvironmentBuilds, theProjectsState} from '../core/flux-store/selectors'
import {addArtifactLabel, deleteEnvironment, removeArtifactLabel, saveEnvironment, toggleArtifactOfEnvironment, updateCurrentEnvironment} from '../core/flux-store/environment.actions'
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'
import {AddLabelDialog} from '../dialogs/add-label.dialog'

@Component({
  template: `
    <div class="row">
      <div class="col">
        <bz-environment-form
          [environment]="environment | async | deepClone"
          [verificationResult]="environmentBuilds | async"
          [projects]="projects | async"
          (update)="updateEnvironment($event)"
          (save)="saveEnvironment($event)"
          (delete)="deleteEnvironment()"
          (toggleProject)="toggleProject($event)"
          (addLabel)="addLabel($event)"
          (removeLabel)="removeLabel($event)"
        >
        </bz-environment-form>
      </div>
    </div>
  `
})
export class EnvironmentPage {
  environment = this.store.pipe(select(theCurrentEnvironment))
  environmentBuilds = this.store.pipe(select(theEnvironmentBuilds))
  projects = this.store.pipe(select(theProjectsState))

  updateEnvironment(environment: IEnvironment): void {
    this.store.dispatch(updateCurrentEnvironment({environment}))
  }

  saveEnvironment(environment: IEnvironment): void {
    this.store.dispatch(saveEnvironment({environment}))
  }

  deleteEnvironment(): void {
    this.store.dispatch(deleteEnvironment())
  }

  toggleProject(projectName: string): void {
    this.store.dispatch(toggleArtifactOfEnvironment({projectName}))
  }

  addLabel(projectName: string) {
    const ref = this.modal.open(AddLabelDialog)
    ref.result.then((theNewLabel: IBuildLabel) => {
      this.store.dispatch(addArtifactLabel({
        label: {
          projectName: projectName,
          key: theNewLabel.key,
          value: theNewLabel.value
        }
      }))
    })
  }

  removeLabel(label: IArtifactBuildLabel) {
    this.store.dispatch(removeArtifactLabel({label}))
  }

  constructor(private store: Store<Buildz>, private modal: NgbModal) {
  }
}
