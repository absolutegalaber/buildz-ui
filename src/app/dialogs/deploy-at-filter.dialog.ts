import {Component} from '@angular/core'
import {select, Store} from '@ngrx/store'
import {Buildz} from '../core/flux-store/model'
import {NgbActiveModal, NgbDateStruct, NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap'
import {theCurrentServerName} from '../core/flux-store/selectors'
import {DEPLOY_AT_SEARCH} from '../core/flux-store/server.actions'
import {deepClone} from '../core/util/deep-clone';

@Component({
  template: `
    <div class="modal-header">
      <h3 class="modal-title">Deploy on {{currentServerName | async}}</h3>
    </div>
    <div class="modal-body">
      <div class="row">
        <div class="col-6">
          <h4>During:</h4>
          <ngb-datepicker [(ngModel)]="date" [maxDate]="maxDate"></ngb-datepicker>
        </div>
        <div class="col-6">
          <h4>At:</h4>
          <ngb-timepicker [(ngModel)]="time"></ngb-timepicker>
        </div>
      </div>
      <div class="text-center m-1">
        <button class="btn btn-primary btn-lg" (click)="fetchDeploy()">Fetch Deploy</button>
      </div>
    </div>
  `
})
export class DeployAtFilterDialog {
  currentServerName = this.store.pipe(select(theCurrentServerName))
  date: NgbDateStruct
  maxDate: NgbDateStruct
  time: NgbTimeStruct

  constructor(private store: Store<Buildz>, public activeModal: NgbActiveModal) {
    const now = new Date()

    this.date = { year: now.getFullYear(), month: now.getMonth(), day: now.getDate() }
    this.maxDate = deepClone(this.date)
    this.time = { hour: now.getHours(), minute: now.getMinutes(), second: now.getSeconds() }
  }

  fetchDeploy(): void {
    let serverName = ''
    this.currentServerName.subscribe(val => serverName = val)

    this.store.dispatch(DEPLOY_AT_SEARCH({
      date: new Date(
        this.date.year,
        this.date.month,
        this.date.day,
        this.time.hour,
        this.time.minute,
        this.time.second
      ),
      serverName
    }))

    this.activeModal.close()
  }
}
