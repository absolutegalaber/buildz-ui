import {Component, EventEmitter, Input, Output} from '@angular/core'
import {IReservation, IServer} from '../../core/flux-store/model'

@Component({
  selector: 'bz-servers-list',
  template: `
    <div class="list-group">
      <span class="list-group-item list-group-item-primary">Known Servers</span>
      <button
        *ngFor="let server of servers"
        class="list-group-item list-group-item-action" [ngClass]="{'list-group-item-danger': server.reservation, 'list-group-item-success':!server.reservation}"
        (click)="serverSelected.emit(server.name)"
      >
        <bz-server-id [server]="server"></bz-server-id>
        <fa-icon class="float-right"
          icon="lock"
          *ngIf="server.reservation"
                 [ngbTooltip]="reservationTitle(server.reservation)"
          >
        </fa-icon>
      </button>
    </div>
  `
})

export class ServersListComponent {
  @Input()
  servers: IServer[] = []
  @Output()
  serverSelected = new EventEmitter<string>()

  reservationTitle(reservation: IReservation): string {
    let title = `Reserved by: ${reservation.by}`
    if (reservation.note) {
      title += `\n`
      title += `Note: ${reservation.note}`
    }

    return title
  }
}
