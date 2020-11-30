import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BuildSearch, BuildSearchResult, BuildStats, SearchLabel} from '../service/domain';
import {AddLabelDialog} from './add-label.dialog';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

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
              <input type="text" class="form-control form-control-sm" id="minBuildNumber" aria-describedby="minBuildNumberHelp" name="minBuildNumber" placeholder="Min BuildNumber"
                     (keyup)="doSearch.emit()"
                     [(ngModel)]="theSearch.minBuildNumber">
            </div>
          </div>

          <div class="col-4 d-flex justify-content-center">
            <ngb-pagination [collectionSize]="theSearchResult.totalElements" [pageSize]="theSearch.pageSize" size="sm" [maxSize]="3"
                            (pageChange)="toPage.emit($event)"
            >
            </ngb-pagination>
          </div>
        </div>
        <div class="form-row">

          <div class="col-4">
            <div class="form-group">
              <select class="form-control form-control-sm" [(ngModel)]="theSearch.branch" name="branch" (ngModelChange)="doSearch.emit()">
                <option value="">All Branches</option>
                <option *ngFor="let b of buildzData.projectBranches[theSearch.project]" [value]="b">{{b}}</option>
              </select>
            </div>
          </div>

          <div class="col-2">
            <div class="form-group">
              <input type="text" class="form-control form-control-sm" id="maxBuildNumber" name="maxBuildNumber" placeholder="Max BuildNumber"
                     (keyup)="doSearch.emit()"
                     [(ngModel)]="theSearch.maxBuildNumber">
            </div>
          </div>

          <div class="col-4 text-center">
            <button class="btn btn-sm btn-secondary mx-2" (click)="openAddLabelDialog()">Add Label</button>
            <button class="btn btn-sm btn-secondary mx-2" (click)="openAddLabelDialog()">Reset</button>
            <button class="btn btn-sm btn-secondary mx-2" (click)="doSearch.emit()">Reload</button>
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
export class BuildSearchForm {
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
  toPage = new EventEmitter<number>();
  @Output()
  previousPage = new EventEmitter<void>();
  @Output()
  nextPage = new EventEmitter<void>();

  labelsPresent(): boolean {
    return (this.theSearch && this.theSearch.labels && (Object.keys(this.theSearch.labels).length > 0));
  }

  openAddLabelDialog() {
    let ref = this.modal.open(AddLabelDialog);
    ref.result.then((theNewLabel: SearchLabel) => {
      this.addLabel.emit({
        key: theNewLabel.key,
        value: theNewLabel.value
      });
    })
  }

  constructor(private modal: NgbModal) {
  }
}
