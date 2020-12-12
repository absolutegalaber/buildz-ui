import {Component} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Buildz, IBuildLabel, IBuildSearchParams} from '../core/flux-store/model';
import {theBuildSearchParams, theBuildSearchResult, theProjectsState} from '../core/flux-store/selectors';
import {addSearchLabel, removeSearchLabel, resetSearchParams, updateSearchParams} from '../core/flux-store/build-search.actions';
import {AddLabelDialog} from '../dialogs/add-label.dialog';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <bz-build-search-form
            [theSearch]="search | async | deepClone"
            [theSearchResult]="searchResult | async"
            [projects]="projects | async"
            (updateSearchParams)="updateSearchParams($event)"
            (resetSearch)="resetSearch()"
            (addSearchLabel)="openAddLabelDialog()"
            (removeSearchLabel)="removeSearchLabel($event)"
          >
          </bz-build-search-form>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-10 offset-1">
          <bz-builds-accordion
            [builds]=" (searchResult | async).builds"
          ></bz-builds-accordion>
        </div>
      </div>
    </div>
  `
})
export class BuildsPage {
  search = this.store.pipe(select(theBuildSearchParams))
  searchResult = this.store.pipe(select(theBuildSearchResult))
  projects = this.store.pipe(select(theProjectsState))

  updateSearchParams(search: IBuildSearchParams) {
    this.store.dispatch(updateSearchParams({search}))
  }

  resetSearch() {
    this.store.dispatch(resetSearchParams())
  }

  openAddLabelDialog() {
    let ref = this.modal.open(AddLabelDialog);
    ref.result.then((label: IBuildLabel) => {
      this.store.dispatch(addSearchLabel({label}))
    })
  }

  removeSearchLabel(label: IBuildLabel) {
    this.store.dispatch(removeSearchLabel({label}))
  }

  constructor(private store: Store<Buildz>, private modal: NgbModal) {
  }
}
