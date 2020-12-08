import {Component} from '@angular/core';

@Component({
  selector: 'bz-center',
  template: `
    <div class="container d-flex h-100">
      <div class="row justify-content-center align-self-center">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class DeadCenterComponent {
}
