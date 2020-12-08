import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ISelectedProjectAndBranch} from '../../core/flux-store/model';

@Component({
  selector: 'bz-set-active',
  template: `
    <div class="row">
      <div class="col-6">
        <div class="row" *ngIf="selectedProjectAndBranch.project?.length > 0">
          <div class="col-6">
            {{selectedProjectAndBranch.project}}
          </div>
          <div class="col-6 text-right">
            <button class="btn btn-danger" (click)="toggleProjectActive.emit()">Toggle</button>
          </div>
        </div>
      </div>

      <div class="col-6">
        <div class="row" *ngIf="selectedProjectAndBranch.branch?.length>0">
          <div class="col-6">
            {{selectedProjectAndBranch.branch}}
          </div>
          <div class="col-6 text-right">
            <button class="btn btn-danger" (click)="toggleBranchActive.emit()">Toggle</button>
          </div>
        </div>
      </div>

    </div>
  `
})
export class SetActivationForm {
  @Input()
  selectedProjectAndBranch: ISelectedProjectAndBranch
  @Output()
  toggleProjectActive = new EventEmitter<void>()
  @Output()
  toggleBranchActive = new EventEmitter<void>()

}
