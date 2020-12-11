import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ISelectedProjectAndBranch} from '../../core/flux-store/model';

@Component({
  selector: 'bz-set-active',
  template: `
    <div class="row" *ngIf="selectedProjectAndBranch?.project?.name.length > 0">
      <div class="col-12 text-center">
        <button class="btn btn-danger" (click)="toggleProjectActive.emit()">
          Set Project '{{selectedProjectAndBranch.project.name}}' to status {{selectedProjectAndBranch.project.active ? 'Inactive' : 'Active'}}
        </button>
      </div>
    </div>

    <div class="row mt-4" *ngIf="selectedProjectAndBranch.branch?.name.length>0">
      <div class="col-12 text-center">
        <button class="btn btn-danger" (click)="toggleBranchActive.emit()">
          Set Branch '{{selectedProjectAndBranch.branch.name}}' of Project '{{selectedProjectAndBranch.project.name}}' to status {{selectedProjectAndBranch.branch.active ? 'Inactive' : 'Active'}}
        </button>
      </div>
    </div>
  `
})
export class SetActivationPanel {
  @Input()
  selectedProjectAndBranch: ISelectedProjectAndBranch
  @Output()
  toggleProjectActive = new EventEmitter<void>()
  @Output()
  toggleBranchActive = new EventEmitter<void>()

}
