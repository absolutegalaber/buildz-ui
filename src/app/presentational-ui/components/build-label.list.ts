import {Component, Input} from '@angular/core';
import {IBuild} from '../../core/flux-store/model';

@Component({
  selector: 'bz-build-label-list',
  template: `
    <table *ngIf="build != null" class="table table-striped table-sm">
      <tr>
        <td colspan="2"><b>{{build.project}}:{{build.branch}}:{{build.buildNumber}}</b></td>
      </tr>
      <tr *ngFor="let label of build.labels | keyvalue">
        <td>{{label.key}}</td>
        <td>{{label.value}}</td>
      </tr>
    </table>
    <span *ngIf="build != null && build.labels.length == 0"><b>{{build.project}}:{{build.branch}}:{{build.buildNumber}}</b> has no Labels </span>
    <span *ngIf="build === null"> Nothing Selected </span>
  `
})
export class BuildLabelList {
  @Input()
  build: IBuild;
}
