import {Component} from '@angular/core';
import {BuildzData} from '../service/buildz-data.service';

@Component({
  template: `
    <bz-stats [stats]="buildzData.data | async"></bz-stats>
  `
})
export class HomePage {
  constructor(public buildzData: BuildzData) {
  }
}
