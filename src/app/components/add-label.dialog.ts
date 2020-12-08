import {Component, EventEmitter} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {select, Store} from '@ngrx/store';
import {Buildz, IBuildLabel, IProjects} from '../core/flux-store/model';
import {projects} from '../core/flux-store/selectors';
import {Observable} from 'rxjs';

@Component({
  selector: 'bz-add-label-dialog',
  template: `
    <ng-container *ngIf="projects | async as theBuildzData">
      <div class="modal-header">
        <h4 class="modal-title">Add Label</h4>
        <!--        <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">-->
        <!--          <span aria-hidden="true">&times;</span>-->
        <!--        </button>-->
      </div>
      <div class="modal-body">
        <form novalidate>

          <div class="form-group">
            <select class="form-control form-control-sm" [(ngModel)]="newLabel.key" name="newLabelKey">
              <option *ngFor="let lk of theBuildzData.labelKeys" [value]="lk">{{lk}}</option>
            </select>
          </div>
        </form>

        <div class="form-group">
          <div class="form-group">
            <input type="text" class="form-control form-control-sm" name="newLabelValue" placeholder="New Label Value"
                   [(ngModel)]="newLabel.value">
          </div>
        </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-dark" (click)="activeModal.close(this.newLabel)">Add</button>
        <button type="button" class="btn btn-outline-dark" (click)="activeModal.dismiss()">Cancel</button>
      </div>
    </ng-container>

  `
})
export class AddLabelDialog {
  projects: Observable<IProjects> = this.store.pipe(select(projects))
  newLabel: IBuildLabel = {
    key: '',
    value: ''
  }
  addLabel = new EventEmitter<IBuildLabel>()

  constructor(private store: Store<Buildz>, public activeModal: NgbActiveModal) {
  }
}
