import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'bz-set-active',
  template: `
    <div class="row">
      <div class="col-6">
        <div class="row" *ngIf="project?.length > 0">
          <div class="col-6">
            {{project}}
          </div>
          <div class="col-6 text-right">
            <button class="btn btn-danger" (click)="toggleProjectActive.emit()">Toggle</button>
          </div>
        </div>
      </div>

      <div class="col-6">
        <div class="row" *ngIf="branch?.length>0">
          <div class="col-6">
            {{branch}}
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
  includeInactive: boolean = false
  @Input()
  project: string = ''
  @Input()
  branch: string = ''
  @Output()
  toggleProjectActive = new EventEmitter<void>()
  @Output()
  toggleBranchActive = new EventEmitter<void>()

}
