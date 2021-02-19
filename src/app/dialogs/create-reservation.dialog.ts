import {Buildz} from '../core/flux-store/model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {theCurrentServer} from '../core/flux-store/selectors';
import {RESERVE_SERVER} from '../core/flux-store/server.actions';

@Component({
  selector: 'bz-create-reservation-dialog',
  templateUrl: 'create-reservation.dialog.html'
})
// tslint:disable-next-line:component-class-suffix
export class CreateReservationDialog {
  serverName = '';
  by = '';
  note = '';

  reserveServer(): void {
    this.store.dispatch(RESERVE_SERVER({ event: {
        serverName: this.serverName,
        reservation: {
          reservedBy: this.by,
          reservationNote: this.note
        }
    }}));

    this.activeModal.close();
  }

  constructor(private store: Store<Buildz>, public activeModal: NgbActiveModal) {
    this.store.select(theCurrentServer)
        .subscribe(server => this.serverName = server.name);
  }
}
