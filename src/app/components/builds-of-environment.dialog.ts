import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {EnvironmentsApi} from '../service/environments-api.service';
import {toBuildsArray} from '../service/util-functions';
import {EnvironmentBuilds} from '../service/domain';

@Component({
  selector: 'bz-default-dialog',
  template: `
    <ng-container *ngIf="environmentsApi.environmentBuilds | async as theEnvironmentBuilds">
      <div class="modal-header">
        <h4 class="modal-title">Builds of {{theEnvironmentBuilds.environment}}</h4>
<!--        <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">-->
<!--          <span aria-hidden="true">&times;</span>-->
<!--        </button>-->
      </div>
      <div class="modal-body">
        <bz-builds-accordion
          [searchResult]="toArray(theEnvironmentBuilds)"
        >
        </bz-builds-accordion>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" [routerLink]="['/edit-environment', theEnvironmentBuilds.environment]" (click)="activeModal.close()">Edit</button>
        <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">OK</button>
      </div>
    </ng-container>
  `
})
export class BuildsOfEnvironmentDialog {

  toArray(theEnvironmentBuilds: EnvironmentBuilds) {
    return toBuildsArray(theEnvironmentBuilds);
  }

  constructor(public environmentsApi: EnvironmentsApi, public activeModal: NgbActiveModal) {
  }
}
