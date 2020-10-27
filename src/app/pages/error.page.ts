import {Component} from '@angular/core';
import {BuildzError} from '../service/buildz-error.state';

@Component({
  template: `
    <div class="container-fluid">
      <bz-error-alert
        [error]="theError|async"
      >
      </bz-error-alert>
    </div>
  `
})
export class ErrorPage {
  theError = this.buildzError.error;

  constructor(public buildzError: BuildzError) {
  }
}
