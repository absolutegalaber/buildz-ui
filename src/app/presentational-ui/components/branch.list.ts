import {Component, EventEmitter, Input, Output} from '@angular/core'
import {IBranch, IProjectWithBranches} from '../../core/flux-store/model'

@Component({
  selector: 'bz-branch-list',
  template: `
    <div class="list-group" *ngIf="projectWithBranches?.project?.name?.length > 0">
      <span class="list-group-item list-group-item-primary">Known Branches of Project <b>'{{projectWithBranches.project.name}}'</b></span>
      <button class="list-group-item list-group-item-action"
              *ngFor="let branch of projectWithBranches.branches"
              (click)="branchSelected.emit(branch)"
      >
        {{branch.name}}
      </button>
    </div>
    <div class="row">
      <div class="col">
        {{projectWithBranches |json}}
      </div>
    </div>
  `
})
export class BranchList {
  @Input()
  projectWithBranches: IProjectWithBranches
  @Output()
  branchSelected = new EventEmitter<IBranch>()
}
