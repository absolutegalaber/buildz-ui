import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'bz-branch-list',
  template: `
    <div class="list-group" *ngIf="project?.length > 0">
      <span class="list-group-item list-group-item-primary">Known Branches of Project <b>'{{project}}'</b></span>
      <button class="list-group-item list-group-item-action"
              *ngFor="let branch of branches"
              (click)="branchSelected.emit(branch)"
      >
        {{branch}}
      </button>
    </div>
  `
})
export class BranchList {
  @Input()
  project: string = ''
  @Input()
  branches: string[] = []
  @Output()
  branchSelected = new EventEmitter<string>()
}
