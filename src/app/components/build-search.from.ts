import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BuildSearch, BuildSearchResult, BuildStats, SearchLabel} from '../service/domain';

@Component({
  selector: 'bz-build-search-form',
  template: `
    <div class="container-fluid" *ngIf="theSearch !== null && theSearchResult !== null">
      <form novalidate (submit)="doSearch.emit()">
        <div class="form-row">

          <div class="col-4">
            <div class="form-group">
              <select class="form-control form-control-sm" [(ngModel)]="theSearch.project" name="project" (change)="doSearch.emit()">
                <option value="">All Projects</option>
                <option *ngFor="let p of buildzData.projects" [value]="p">{{p}}</option>
              </select>
            </div>
          </div>

          <div class="col-2">
            <div class="form-group">
              <input type="text" class="form-control form-control-sm" id="branch" aria-describedby="minBuildNumberHelp" name="minBuildNumber" placeholder="Min BuildNumber"
                     (keyup)="doSearch.emit()"
                     [(ngModel)]="theSearch.minBuildNumber">
            </div>
          </div>

          <div class="col-4">
            <div class="form-group">
              <select class="form-control form-control-sm" [(ngModel)]="newLabel.key" name="newLabelKey">
                <option value="">New Label Key</option>
                <option *ngFor="let lk of buildzData.labelKeys" [value]="lk">{{lk}}</option>
              </select>
            </div>
          </div>

          <div class="col-2 text-right">
            <button class="btn btn-sm" (click)="previousPage.emit()">&lt;&lt;&lt;</button>
            <a class="btn btn-sm" disabled="disabled">
              {{theSearchResult.page + 1}} / {{theSearchResult.totalPages}}
            </a>
            <button class="btn btn-sm" (click)="nextPage.emit()">&gt;&gt;&gt;</button>
          </div>
        </div>

        <div class="form-row">

          <div class="col-4">
            <div class="form-group">
              <select class="form-control form-control-sm" [(ngModel)]="theSearch.branch" name="branch" (ngModelChange)="doSearch.emit()">
                <option value="">All Branches</option>
                <option *ngFor="let b of buildzData.branches" [value]="b">{{b}}</option>
              </select>
            </div>
          </div>

          <div class="col-2">
            <div class="form-group">
              <input type="text" class="form-control form-control-sm" id="branch" name="maxBuildNumber" placeholder="Max BuildNumber"
                     (keyup)="doSearch.emit()"
                     [(ngModel)]="theSearch.maxBuildNumber">
            </div>
          </div>

          <div class="col-4">
            <div class="form-group">
              <input type="text" class="form-control form-control-sm" id="branch" name="newLabelValue" placeholder="New Label Value"
                     [(ngModel)]="newLabel.value">
            </div>
          </div>

          <div class="col-2 text-right">
            <button class="btn btn-sm btn-secondary" (click)="emitNewLabel()" [disabled]="!(newLabel.key.length>0 && newLabel.value.length>0)">Add Label</button>
          </div>

        </div>

        <div class="form-row" *ngFor="let label of theSearch.labels | keyvalue">

          <div class="col-4">
            <div class="form-group">
              <input type="text" class="form-control form-control-sm"
                     [value]="label.key" readonly>
            </div>
          </div>

          <div class="col-4">
            <div class="form-group">
              <input type="text" class="form-control form-control-sm"
                     [value]="label.value" readonly>
            </div>
          </div>

          <div class="col-4">
            <button class="btn btn-sm btn-danger" (click)="clearLabels.emit(label.key)">X</button>
          </div>
        </div>
      </form>
    </div>
  `
})
export class BuildSearchFrom {
  @Input()
  theSearch: BuildSearch;
  @Input()
  theSearchResult: BuildSearchResult;
  @Input()
  buildzData: BuildStats;
  @Output()
  doSearch = new EventEmitter<void>();
  @Output()
  addLabel = new EventEmitter<SearchLabel>();
  @Output()
  clearLabels = new EventEmitter<string>();
  @Output()
  previousPage = new EventEmitter<void>();
  @Output()
  nextPage = new EventEmitter<void>();

  labelsPresent(): boolean {
    return (this.theSearch && this.theSearch.labels && (Object.keys(this.theSearch.labels).length > 0));
  }

  emitNewLabel() {
    this.addLabel.emit(this.newLabel);
    this.newLabel = {
      key: '',
      value: ''
    };
  }

  newLabel: SearchLabel = {
    key: '',
    value: ''
  };
}
