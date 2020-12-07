import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'bz-project-list',
  template: `
    <div class="list-group">
      <span class="list-group-item list-group-item-primary">Known Projects</span>
      <button class="list-group-item list-group-item-action"
              *ngFor="let project of projects"
              (click)="projectSelected.emit(project)"
      >
        {{project}}
      </button>
    </div>
  `
})
export class ProjectList {
  @Input()
  projects: string[] = [];
  @Output()
  projectSelected = new EventEmitter<string>();
}
