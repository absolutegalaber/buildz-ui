import {Component} from '@angular/core';
import {BuildsApi} from '../service/builds-api.service';

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

  constructor(public buildsApi: BuildsApi) {
  }
}
