import {Component, Input} from '@angular/core';

@Component({
  selector: 'bz-error-alert',
  template: `
    <div class="col-8 offset-2 alert alert-danger">
      <ng-container *ngIf="error === null">
        No error ?
      </ng-container>
      <ng-container *ngIf="error !== null">
        <h5 class="alert-heading">{{error.error?.description}}</h5>
        <p>{{error.error?.message}}</p>
      </ng-container>
    </div>

  `
})
export class ErrorAlertPanel {
  @Input()
  error: any;
}
