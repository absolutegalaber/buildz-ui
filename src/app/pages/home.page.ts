import {Component} from '@angular/core';
import {BuildzData} from '../service/buildz-data.state';
import {EnvironmentsApi} from '../service/environments-api.service';

@Component({
  template: `
    <bz-stats
      [stats]="buildzData.data | async"
      (projectSelected)="environmentsApi.loadBuildsOf($event)"
    >
    </bz-stats>
    <bz-environment-builds-panel
      [environmentBuilds]="environmentsApi.environmentBuilds | async"
    >
    </bz-environment-builds-panel>
  `
})
export class HomePage {
  constructor(public buildzData: BuildzData, public environmentsApi: EnvironmentsApi) {
  }
}
