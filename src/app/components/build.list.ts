import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Build, BuildSearchResult} from '../service/domain';

@Component({
  selector: 'bz-build-list',
  template: `
    <table class="table table-striped table-sm" *ngIf="searchResult != null">
      <thead>
      <tr>
        <td>Found {{searchResult.totalElements}} Builds</td>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let build of searchResult.builds" (click)="buildSelected.emit(build)" style="cursor: pointer">
        <td>
          {{build.project}}:{{build.branch}}:{{build.buildNumber}}
        </td>
      </tr>
      </tbody>
    </table>
    <span *ngIf="searchResult === null"> Nothing Loaded </span>
  `
})
export class BuildList {
  @Input()
  searchResult: BuildSearchResult;
  @Output()
  buildSelected = new EventEmitter<Build>();


}
