import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BuildSearch} from '../service/domain';

@Component({
  selector: 'bz-build-search-form',
  template: `
    <form novalidate (submit)="doSearch.emit()">
      <div class="form-group">
        <label for="project">Project</label>
        <input type="text" class="form-control" id="project" aria-describedby="projectHelp" name="project"
               [(ngModel)]="theSearch.project">
        <small id="projectHelp" class="form-text text-muted">Project name</small>
      </div>
      <div class="form-group">
        <label for="branch">Branch</label>
        <input type="text" class="form-control" id="branch" aria-describedby="branchHelp" name="branch"
               [(ngModel)]="theSearch.branch">
        <small id="branchHelp" class="form-text text-muted">Branch name</small>
      </div>
      <input type="submit" class="btn btn-primary" value="Filter"/>
    </form>
  `
})
export class BuildSearchFrom {
  @Input()
  theSearch: BuildSearch;
  @Output()
  doSearch = new EventEmitter<void>();
}
