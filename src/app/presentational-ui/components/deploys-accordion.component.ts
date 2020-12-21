import {Component, Input} from '@angular/core';
import {IDeploy} from '../../core/flux-store/model';

@Component({
  selector: 'bz-deploys-accordion',
  templateUrl: './deploys-accordion.component.html'
})
export class DeploysAccordionComponent {
  @Input()
  deploys: IDeploy[] = [];
}
