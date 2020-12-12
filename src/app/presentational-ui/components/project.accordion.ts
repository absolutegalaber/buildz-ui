import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IProject, IProjectBranch, IProjects} from '../../core/flux-store/model';

@Component({
  selector: 'bz-project-accordion',
  template: `
    <ngb-accordion [closeOthers]="true">
      <ngb-panel *ngFor="let project of projects.projects" (click)="projectSelected.emit(project)" [id]="project.name">
        <ng-template ngbPanelHeader>
          <div class="d-flex align-items-center justify-content-between">
            <button class="btn" ngbPanelToggle>
              {{project.name}}
            </button>
            <button ngbPanelToggle class="btn">
              <bz-is-visible [entity]="project"></bz-is-visible>
            </button>
          </div>
        </ng-template>
        <ng-template ngbPanelContent>
          <div class="d-flex align-items-center justify-content-between">
            <button class="btn" (click)="projectSelected.emit(project)"><b>{{project.name}}</b></button>
            <button class="btn" (click)="projectSelected.emit(project)">
              <bz-is-visible [entity]="project"></bz-is-visible>
            </button>
          </div>
          <div class="mx-4 d-flex align-items-center justify-content-between" *ngFor="let branch of projects.projectBranches[project.name]">
            <button class="btn" (click)="branchSelected.emit({projectName:project.name, branchName:branch.name, active: branch.active})">
              <b>{{branch.name}}</b>
            </button>
            <button class="btn" (click)="branchSelected.emit({projectName:project.name, branchName:branch.name, active: branch.active})">
              <bz-is-visible [entity]="branch"></bz-is-visible>
            </button>
          </div>
        </ng-template>
      </ngb-panel>
    </ngb-accordion>
  `
})
export class ProjectAccordion {
  @Input()
  projects: IProjects;
  @Output()
  projectSelected = new EventEmitter<IProject>()
  @Output()
  branchSelected = new EventEmitter<IProjectBranch>()
}
