import {Component} from '@angular/core';
import {EnvironmentsApi} from '../service/environments-api.service';
import {BuildzData} from '../service/buildz-data.state';

@Component({
  template: `
    <div class="row">
      <div class="col">
        <bz-environment-form
          [environment]="environmentsApi.environment | async"
          [verificationResult]="environmentsApi.environmentVerificationResult |async"
          [buildzData]="buildzData.data | async"
          (toggleProject)="environmentsApi.toggleRequiredProject($event)"
          (addLabel)="environmentsApi.addLabel($event)"
          (removeLabel)="environmentsApi.removeLabel($event)"
          (verify)="environmentsApi.verify()"
          (save)="environmentsApi.save()"
        >
        </bz-environment-form>
      </div>
    </div>
  `
})
export class EnvironmentPage {
  constructor(public environmentsApi: EnvironmentsApi, public buildzData: BuildzData) {
  }
}
