import {Component} from '@angular/core';
import {Buildz} from '../core/flux-store/model';
import {select, Store} from '@ngrx/store';
import {theCurrentServer} from '../core/flux-store/selectors';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CreateReservationDialog} from '../dialogs/create-reservation.dialog';
import {ReleaseReservationDialog} from '../dialogs/release-reservation.dialog';

@Component({
  template: `
    <div class="container-fluid" *ngIf="(server | async) as server">
      <div class="row">
        <div class="col">
          <h2 class="text-center mt-3">Server: {{server.name}}</h2>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col text-center">
          <button
            *ngIf="server.reservation"
            class="btn btn-primary btn-lg mx-2"
            (click)="startRelease()"
          >
            Release
          </button>
          <button
            *ngIf="!server.reservation"
            class="btn btn-primary btn-lg mx-2"
            (click)="startReservation()"
          >
            Reserve
          </button>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-10 offset-1">
          <bz-deploys-accordion
            [deploys]="server.deploys"
          ></bz-deploys-accordion>
        </div>
      </div>
    </div>
  `
})
// tslint:disable-next-line:component-class-suffix
export class DeploysPage {
  server = this.store.pipe(select(theCurrentServer));

  constructor(private store: Store<Buildz>, private modelService: NgbModal) {}

  startReservation(): void {
    this.modelService.open(CreateReservationDialog, {size: 'lg'});
  }

  startRelease(): void {
    this.modelService.open(ReleaseReservationDialog, {size: 'lg'});
  }
}
