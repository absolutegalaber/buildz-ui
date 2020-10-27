import {Component, Input} from '@angular/core';
import {EnvironmentBuilds} from '../service/domain';

@Component({
  selector: 'bz-environment-builds-panel',
  template: `
    <div class="row" *ngIf="environmentBuilds.environment != null && environmentBuilds.environment.length > 0">
      <div class="col offset-8">
        <table class="table table-striped table-sm">
          <thead>
          <tr>
            <td colspan="3">
              <b>Environment: {{environmentBuilds.environment}}</b>
            </td>
          </tr>
          </thead>
          <tbody>
          <tr>
          </tr>
          <tr *ngFor="let build of environmentBuilds.builds | keyvalue">
            <td>{{build.value.project}}</td>
            <td>{{build.value.branch}}</td>
            <td>{{build.value.buildNumber}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class EnvironmentBuildsPanel {
  @Input()
  environmentBuilds: EnvironmentBuilds;
}
