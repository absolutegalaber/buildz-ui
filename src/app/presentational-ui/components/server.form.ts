import {Component, EventEmitter, Input, Output} from '@angular/core'
import {IServer} from '../../core/flux-store/model'

@Component({
  selector: 'bz-server-form',
  template: `
    <form novalidate>
      <div class="form-group">
        <input type="text" class="form-control form-control-sm" id="serverNick" name="serverNick" placeholder="NickName"
               [(ngModel)]="server.nickName">
      </div>
      <div class="form-group">
        <input type="text" class="form-control form-control-sm" id="description" name="description" placeholder="Description"
               [(ngModel)]="server.description">
      </div>
      <div class="form-group text-right">
        <button class="btn btn-sm btn-primary" (click)="updateServer.emit(server)" [disabled]="server.id <= 0">
          <fa-icon icon="save"></fa-icon>
          Save
        </button>
      </div>
    </form>
  `
})

export class ServerForm {
  @Input()
  server: IServer
  @Output()
  updateServer = new EventEmitter<IServer>()
}
