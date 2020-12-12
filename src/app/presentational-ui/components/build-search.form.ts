import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IBuildLabel, IBuildSearchParams, IBuildSearchResult, IProjects} from '../../core/flux-store/model';

@Component({
  selector: 'bz-build-search-form',
  template: `
    <div class="container-fluid" *ngIf="theSearch !== null && theSearchResult !== null">
      <form novalidate (submit)="updateSearchParams.emit(theSearch)">
        <div class="form-row">

          <div class="col-4">
            <div class="form-group">
              <select class="form-control form-control-sm" [(ngModel)]="theSearch.project" name="project" (change)="updateSearchParams.emit(theSearch)">
                <option value="">All Projects</option>
                <option *ngFor="let p of projects.projects" [value]="p.name">{{p.name}}</option>
              </select>
            </div>
          </div>

          <div class="col-2">
            <div class="form-group">
              <input type="text" class="form-control form-control-sm" id="minBuildNumber" aria-describedby="minBuildNumberHelp" name="minBuildNumber" placeholder="Min BuildNumber"
                     (keyup)="updateSearchParams.emit(theSearch)"
                     [(ngModel)]="theSearch.minBuildNumber">
            </div>
          </div>

          <div class="col-4 d-flex justify-content-center">
            <ngb-pagination [collectionSize]="theSearchResult.totalElements" [pageSize]="theSearch.pageSize" size="sm" [maxSize]="3"
                            (pageChange)="toPage($event)"
            >
            </ngb-pagination>
          </div>
        </div>
        <div class="form-row">

          <div class="col-4">
            <div class="form-group">
              <select class="form-control form-control-sm" [(ngModel)]="theSearch.branch" name="branch" (ngModelChange)="updateSearchParams.emit(theSearch)">
                <option value="">All Branches</option>
                <option *ngFor="let b of projects.projectBranches[theSearch.project]" [value]="b.name">{{b.name}}</option>
              </select>
            </div>
          </div>

          <div class="col-2">
            <div class="form-group">
              <input type="text" class="form-control form-control-sm" id="maxBuildNumber" name="maxBuildNumber" placeholder="Max BuildNumber"
                     (keyup)="updateSearchParams.emit(theSearch)"
                     [(ngModel)]="theSearch.maxBuildNumber">
            </div>
          </div>

          <div class="col-4 text-center">
            <button class="btn btn-sm btn-secondary mx-2" (click)="addSearchLabel.emit()">
              <fa-icon icon="plus"></fa-icon>
              Add Label
            </button>
            <button class="btn btn-sm btn-secondary mx-2" (click)="resetSearch.emit()">
              <fa-icon icon="undo"></fa-icon>
              Reset
            </button>
            <button class="btn btn-sm btn-secondary mx-2" (click)="updateSearchParams.emit(theSearch)">
              <fa-icon icon="sync"></fa-icon>
              Reload
            </button>
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
            <button class="btn btn-sm btn-danger" (click)="removeSearchLabel.emit({key:label.key, value:label.value})">
              <fa-icon icon="backspace"></fa-icon>
            </button>
          </div>
        </div>
      </form>
    </div>
  `
})
export class BuildSearchForm {
  @Input()
  theSearch: IBuildSearchParams;
  @Input()
  theSearchResult: IBuildSearchResult;
  @Input()
  projects: IProjects
  @Output()
  resetSearch = new EventEmitter<void>();
  @Output()
  addSearchLabel = new EventEmitter<void>();
  @Output()
  removeSearchLabel = new EventEmitter<IBuildLabel>();
  @Output()
  updateSearchParams = new EventEmitter<IBuildSearchParams>();

  labelsPresent(): boolean {
    return (this.theSearch && this.theSearch.labels && (Object.keys(this.theSearch.labels).length > 0));
  }

  toPage(page: number) {
    this.theSearch.page = (page - 1)
    this.updateSearchParams.emit(this.theSearch)
  }

  constructor() {
  }
}
