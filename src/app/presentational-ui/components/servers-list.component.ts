import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IServer} from '../../core/flux-store/model';

@Component({
  selector: 'bz-servers-list',
  templateUrl: './servers-list.component.html'
})

export class ServersListComponent {
  @Input()
  servers: IServer[] = [];
  @Output()
  serverSelected = new EventEmitter<string>();
}
