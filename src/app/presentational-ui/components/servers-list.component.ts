import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IServer} from '../../core/flux-store/model';

@Component({
  selector: 'bz-servers-list',
  template: `
    <div class="list-group">
      <span class="list-group-item list-group-item-primary">Known Servers</span>
      <button
        *ngFor="let server of servers"
        class="list-group-item list-group-item-action"
        (click)="serverSelected.emit(server.name)"
      >
        {{server.name}}
      </button>
    </div>
  `
})

export class ServersListComponent {
  @Input()
  servers: IServer[] = [];
  @Output()
  serverSelected = new EventEmitter<string>();
}
