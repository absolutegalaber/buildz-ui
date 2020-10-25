import {Component} from '@angular/core';
import {BuildzApi} from '../service/builds-api.service';

@Component({
  template: `
    <bz-environment-builds-panel
      [environmentBuilds]="environmentBuilds | async"
    >
    </bz-environment-builds-panel>


  `
})
export class EnvironmentBuildsPage {
  environmentBuilds = this.buildsApi.environmentBuilds

  constructor(public buildsApi: BuildzApi) {
  }
}
