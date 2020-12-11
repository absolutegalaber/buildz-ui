import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IBranch, IProject, IProjects} from '../../core/flux-store/model';

@Component({
  selector: 'bz-project-accordion',
  template: `
    <ngb-accordion [closeOthers]="false">
      <ngb-panel *ngFor="let project of projects.projects" title="{{project.name}}" (click)="projectSelected.emit(project)">
        <ng-template ngbPanelHeader>
          <div class="d-flex align-items-center justify-content-between">
            <a class="btn" (click)="projectSelected.emit(project)">
              <b>{{project.name}}</b>
            </a>
            <input type="checkbox"
                   value="{{project}}_active" [checked]="project.active" id="{{project}}_active" (click)="projectSelected.emit(project)">
            <button ngbPanelToggle (click)="projectSelected.emit(project)" class="btn btn-link p-0">Branches...</button>
          </div>
        </ng-template>
        <ng-template ngbPanelContent>
          <table class="table">
            <tr *ngFor="let branch of projects.projectBranches[project.name]">
              <td colspan="2">
                <a class="btn" (click)="branchSelected.emit(branch)">
                  <b>{{branch.name}}</b>
                  <fa-icon icon="toggle-on" *ngIf="project.active"></fa-icon>
                  <fa-icon icon="toggle-off" *ngIf="!project.active"></fa-icon>
                </a>
              </td>
            </tr>
          </table>
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
  branchSelected = new EventEmitter<IBranch>()
}
