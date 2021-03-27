import {Component, Input} from '@angular/core'
import {IServer} from '../../core/flux-store/model'

@Component({
  selector: 'bz-server-id',
  template: `
    <span [ngbTooltip]="description()" placement="right">{{name()}}</span>
  `
})
export class ServerIdentifier {
  @Input()
  server: IServer

  name(): string {
    if (!!this.server.nickName) {
      return `${this.server.nickName} (${this.server.name})`
    } else {
      return this.server.name
    }
  }

  description(): string {
    return this.server.description ? this.server.description : 'No Description.'
  }

}
