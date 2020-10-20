import {Component, Input} from '@angular/core';
import {Build} from '../service/domain';

@Component({
  selector: 'bz-build-label-list',
  template: `
    <table *ngIf="build != null && build.labels.length>0">
      <tr *ngFor="let label of build.labels">
        <td>{{label.key}}</td>
        <td>{{label.value}}</td>
      </tr>
    </table>
    <span *ngIf="build != null && build.labels.length == 0"> No Labels </span>
    <span *ngIf="build === null"> Nothing Selected </span>
  `
})
export class BuildLabelList {
  @Input()
  build: Build;
}
