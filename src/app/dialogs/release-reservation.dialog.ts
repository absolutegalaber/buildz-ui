import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Buildz} from '../core/flux-store/model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {theCurrentServer} from '../core/flux-store/selectors';
import {RELEASE_SERVER, RESERVE_SERVER} from '../core/flux-store/server.actions';

@Component({
  selector: 'bz-release-reservation-dialog',
  templateUrl: 'release-reservation.dialog.html'
})
// tslint:disable-next-line:component-class-suffix
export class ReleaseReservationDialog {
  serverName = '';

  releaseServer(): void {
    this.store.dispatch(RELEASE_SERVER({serverName: this.serverName}));

    this.activeModal.close();
  }

  constructor(private store: Store<Buildz>, public activeModal: NgbActiveModal) {
    this.store.select(theCurrentServer)
      .subscribe(server => this.serverName = server.name);
  }
}
