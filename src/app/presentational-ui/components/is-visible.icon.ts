import {Component, Input} from '@angular/core'
import {IBranch, IProject} from '../../core/flux-store/model'

@Component({
  selector: 'bz-is-visible',
  template: `
    <fa-icon icon="eye" size="2x" *ngIf="entity.active"></fa-icon>
    <fa-icon icon="eye-slash" size="2x" *ngIf="!entity.active"></fa-icon>
  `
})
export class IsVisibleIcon {
  @Input()
  entity: IProject | IBranch
}
