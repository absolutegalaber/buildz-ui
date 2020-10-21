import {Component, Input} from '@angular/core';
import {EnvironmentBuilds} from '../service/domain';

@Component({
  selector: 'bz-environment-builds-panel',
  template: `
    <div class="row">
      <div class="col">
        <table class="table table-striped">
          <tbody>
          <tr>
            <td colspan="3">
              <h4>{{environmentBuilds.environment}}</h4>
            </td>
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
