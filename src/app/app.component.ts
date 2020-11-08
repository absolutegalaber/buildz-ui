import {Component} from '@angular/core';
import {BuildzData} from './service/buildz-data.state';

@Component({
  selector: 'app-root',
  template: `
    <bz-navbar></bz-navbar>
    <bz-alert-panel></bz-alert-panel>
    <div class="container-fluid">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  title = 'buildz-ui';


  constructor(buildzData: BuildzData) {
    buildzData.load()
  }
}
