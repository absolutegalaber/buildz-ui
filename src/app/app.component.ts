import {Component} from '@angular/core';
import {BuildzData} from './service/buildz-data.service';

@Component({
  selector: 'app-root',
  template: `
    <bz-navbar></bz-navbar>
    <div class="container-fluid mt-2">
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
