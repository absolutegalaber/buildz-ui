import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IProject} from '../../core/flux-store/model';

@Component({
  selector: 'bz-project-list',
  template: `
    <div class="list-group">
      <span class="list-group-item list-group-item-primary">Known Projects</span>
      <button class="list-group-item list-group-item-action"
              *ngFor="let project of projects"
              (click)="projectSelected.emit(project)"
      >
        {{project.name}}
      </button>
    </div>
  `
})
export class ProjectList {
  @Input()
  projects: IProject[] = [];
  @Output()
  projectSelected = new EventEmitter<IProject>();
}
