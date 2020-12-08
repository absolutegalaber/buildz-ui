import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IBuild, IBuildSearchResult} from '../../core/flux-store/model';

@Component({
  selector: 'bz-build-list',
  template: `
    <div class="list-group" *ngIf="searchResult != null">
      <span class="list-group-item list-group-item-primary">Found {{searchResult.totalElements}} Builds</span>
      <button class="list-group-item list-group-item-action" *ngFor="let build of searchResult.builds"
              (click)="buildSelected.emit(build)"
      >
        {{build.project}}:{{build.branch}}:{{build.buildNumber}}
      </button>
    </div>
    <span *ngIf="searchResult === null"> Nothing Loaded </span>
  `
})
export class BuildList {
  @Input()
  searchResult: IBuildSearchResult;
  @Output()
  buildSelected = new EventEmitter<IBuild>();


}
