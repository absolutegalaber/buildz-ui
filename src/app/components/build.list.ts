import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Build, BuildSearchResult} from '../service/domain';

@Component({
  selector: 'bz-build-list',
  template: `
    <ul class="list-group" *ngIf="searchResult != null">
      <li class="list-group-item text-center">Found {{searchResult.totalElements}} Builds</li>
      <a *ngFor="let build of searchResult.builds"
         (click)="buildSelected.emit(build)"
         class="list-group-item list-group-item-action">{{build.project}}:{{build.branch}}:{{build.buildNumber}}</a>
      <li class="list-group-item text-center">
        <a (click)="previousPage.emit()">&lt;&lt;</a> {{searchResult.page + 1}}/{{searchResult.totalPages}} <a (click)="nextPage.emit()">&gt;&gt;</a>
      </li>
    </ul>
    <span *ngIf="searchResult === null"> Nothing Loaded </span>
  `
})
export class BuildList {
  @Input()
  searchResult: BuildSearchResult;
  @Output()
  buildSelected = new EventEmitter<Build>();
  @Output()
  previousPage = new EventEmitter<void>();
  @Output()
  nextPage = new EventEmitter<void>();

}
