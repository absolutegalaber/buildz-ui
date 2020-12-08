import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {select, Store} from '@ngrx/store';
import {Buildz} from '../../core/flux-store/model';
import {currentEnvironmentName, environmentBuildsAsArray} from '../../core/flux-store/selectors';

@Component({
  selector: 'bz-default-dialog',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Builds of {{currentEnvironmentName | async}}</h4>
      <!--        <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">-->
      <!--          <span aria-hidden="true">&times;</span>-->
      <!--        </button>-->
    </div>
    <div class="modal-body">
      <bz-builds-accordion
        [builds]="environmentBuildsArray | async"
      >
      </bz-builds-accordion>

    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" [routerLink]="['/edit-environment', currentEnvironmentName |async]" (click)="activeModal.close()">Edit</button>
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">OK</button>
    </div>
  `
})
export class BuildsOfEnvironmentDialog {
  currentEnvironmentName = this.store.pipe(select(currentEnvironmentName))
  environmentBuildsArray = this.store.pipe(select(environmentBuildsAsArray))

  constructor(private store: Store<Buildz>, public activeModal: NgbActiveModal) {
  }
}
