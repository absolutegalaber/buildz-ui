import {Component} from '@angular/core';
import {EnvironmentsApi} from '../service/environments-api.service';
import {BuildzData} from '../service/buildz-data.state';

@Component({
  template: `
    <div class="row">
      <div class="col">
        <bz-environment-form
          [environment]="environment|async"
          [buildzData]="buildzData.data | async"
        >
        </bz-environment-form>
      </div>
      <div class="col">
<!--        <bz-environment-builds-panel-->
<!--          [environmentBuilds]="environmentBuilds | async"-->
<!--        >-->
<!--        </bz-environment-builds-panel>-->
      </div>
    </div>
  `
})
export class EnvironmentPage {
  environment = this.environmentsApi.environment;
  environmentBuilds = this.environmentsApi.environmentBuilds;

  constructor(public environmentsApi: EnvironmentsApi, public buildzData: BuildzData) {
  }
}
