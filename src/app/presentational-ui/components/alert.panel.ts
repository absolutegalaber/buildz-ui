import {Component, EventEmitter, Input, Output} from '@angular/core'
import {IAlert} from '../../core/flux-store/model'

@Component({
  selector: 'bz-alert-panel',
  template: `
    <div class="col-10 offset-1" *ngIf="alert.message?.length > 0">
      <div [class]="'alert alert-dismissible alert-'+ alert.type" role="alert">
        <h5 class="alert-heading" [innerHTML]="alert.heading">_</h5>
        <p [innerHTML]="alert.message">_</p>
        <button type="button" class="close" (click)="clearAlert.emit()">
          <span aria-hidden="true">&times</span>
        </button>
      </div>
    </div>
  `
})
export class AlertPanel {
  @Input()
  alert: IAlert
  @Output()
  clearAlert = new EventEmitter<void>()
}
