import {Component, EventEmitter, Input, Output} from '@angular/core'
import {IArtifact, IArtifactBuildLabel, IBuild, IEnvironment, IEnvironmentBuilds, IProjects} from '../../core/flux-store/model'

@Component({
  selector: 'bz-environment-form',
  template: `
    <div class="container-fluid" *ngIf="environment !== null">
      <form novalidate #environmentForm="ngForm">
        <div class="form-row">

          <div class="col-4">
            <div class="form-group">
              <label for="envName">Environment Name</label>
              <input type="text" class="form-control form-control-sm" id="envName" name="envName" [required]="true" [minLength]="1"
                     [(ngModel)]="environment.name">
            </div>
          </div>

          <div class="col-8">
            <bz-center>
              <button *ngIf="!!environment.id" class="btn btn-danger" (click)="delete.emit()">
                <fa-icon icon="backspace"></fa-icon>
                Delete
              </button>
              <button class="btn btn-secondary" (click)="update.emit(this.environment)">
                <fa-icon icon="check"></fa-icon>
                Verify
              </button>
              <button class="btn btn-primary" [disabled]="!environmentForm.valid" (click)="save.emit(environment)">
                <fa-icon icon="save"></fa-icon>
                Save
              </button>
            </bz-center>
          </div>

        </div>

        <div class="row">

          <div class="col-2" *ngFor="let project of projects.projects">
            <div class="form-check align-middle">
              <input class="form-check-input" type="checkbox"
                     value="{{project.name}}" [checked]="hasArtifactOf(project.name)" id="{{project.name}}"
                     (click)="toggleProject.emit(project.name)"
              >
              <label class="form-check-label" for="{{project.name}}">
                {{project.name}}
              </label>
            </div>
          </div>

        </div>

        <div *ngFor="let artifact of environment.artifacts let i = index">
          <div class="form-row">
            <div class="col-3">
              <fieldset class="border rounded p-2">
                <legend class="w-auto">{{i + 1}}. Artifact</legend>

                <div class="form-group">
                  <label for="'project_'{{i}}">Project</label>
                  <input class="form-control form-control-sm" [value]="artifact.project" readonly>
                </div>

                <div class="form-group">
                  <label for="branch_{{i}}">Branch</label>
                  <select class="form-control form-control-sm" name="branch_{{i}}"
                          [(ngModel)]="artifact.branch"
                  >
                    <option *ngFor="let b of projects.projectBranches[artifact.project]" [value]="b.name">{{b.name}}</option>
                  </select>
                </div>

                <div class="form row" *ngFor="let currentLabel of artifact.labels | keyvalue let j = index">

                  <div class="col-9">
                    <div class="form-group">
                      <label for="curLabel_{{j}}">{{currentLabel.key}}</label>
                      <input type="text" class="form-control form-control-sm" id="curLabel_{{j}}" readonly
                             [value]="currentLabel.value">
                    </div>
                  </div>

                  <div class="col-3 text-left align-content-center">
                    <button class="btn btn-sm btn-danger" (click)="removeLabel.emit({projectName: artifact.project, key: currentLabel.key, value: currentLabel.value})">X</button>
                  </div>

                </div>

                <button class="btn btn-sm btn-secondary align-self-end" (click)="addLabel.emit(artifact.project)">Add Label</button>
              </fieldset>

            </div>

            <div class="col-1 text-center">
              <bz-center>
                ==&gt;
              </bz-center>
            </div>

            <div class="col-8">
              <ng-container *ngIf="theBuildOf(artifact.project) !== null">
                <bz-center>
                  <table class="table table-striped table-sm">
                    <thead>
                    <tr>
                      <td colspan="2">
                        <b>
                          <bz-build-id [build]="theBuildOf(artifact.project)"></bz-build-id>
                        </b>
                      </td>
                    </tr>
                    </thead>
                    <tr *ngFor="let l of theBuildOf(artifact.project).labels | keyvalue">
                      <td>{{l.key}}</td>
                      <td>{{l.value}}</td>
                    </tr>
                  </table>
                </bz-center>
              </ng-container>
            </div>
          </div>

        </div>

      </form>

    </div>
  `
})
export class EnvironmentForm {
  @Input()
  environment: IEnvironment
  @Input()
  verificationResult: IEnvironmentBuilds
  @Input()
  projects: IProjects
  @Output()
  update = new EventEmitter<IEnvironment>()
  @Output()
  save = new EventEmitter<IEnvironment>()
  @Output()
  delete = new EventEmitter<void>()
  @Output()
  toggleProject = new EventEmitter<string>()
  @Output()
  addLabel = new EventEmitter<string>()
  @Output()
  removeLabel = new EventEmitter<IArtifactBuildLabel>()

  hasArtifactOf(projectName: string): boolean {
    return !!this.artifactOf(this.environment, projectName)
  }

  theBuildOf(projectName: string): IBuild | null {
    if (!this.verificationResult) {
      return null
    }
    if (this.verificationResult?.builds[projectName]) {
      return this.verificationResult?.builds[projectName]
    }
    return null
  }

  artifactOf(environment: IEnvironment, project: string): IArtifact {
    return environment.artifacts.find((artifact: IArtifact) => artifact.project === project)
  }

  constructor() {
  }
}
