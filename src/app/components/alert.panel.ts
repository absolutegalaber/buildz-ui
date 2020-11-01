import {Component} from '@angular/core';
import {BuildzAlert} from '../service/buildz-alert.state';

@Component({
  selector: 'bz-alert-panel',
  template: `
    <ng-container *ngIf="alert.theAlert|async as theAlert">
      <div class="col-8 offset-2" *ngIf="theAlert != null">
        <ngb-alert [dismissible]="true" [type]="theAlert.type" (click)="alert.dismiss()">
          <h5>{{theAlert.heading}}</h5>
          <p [innerHTML]="theAlert.message"></p>
        </ngb-alert>
      </div>
    </ng-container>

  `
})
export class AlertPanel {

  constructor(public alert: BuildzAlert) {
    alert.theAlert
  }
}
