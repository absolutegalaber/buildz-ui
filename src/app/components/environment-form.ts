import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ArtifactSearchLabel, BuildStats, Environment, EnvironmentBuilds} from '../service/domain';

@Component({
  selector: 'bz-environment-form',
  template: `
    <div class="container-fluid" *ngIf="environment !== null">
      <form novalidate>
        <div class="form-row">

          <div class="col-4">
            <div class="form-group">
              <label for="envName">Environment Name</label>
              <input type="text" class="form-control form-control-sm" id="envName" name="envName"
                     [(ngModel)]="environment.name">
            </div>
          </div>

          <div class="col-8">
            <bz-center>
              <button class="btn btn-secondary" (click)="verify.emit()">Verify</button>
              <button class="btn btn-primary" (click)="save.emit()">Save</button>
            </bz-center>
          </div>

        </div>

        <div class="form-row">

          <div class="col-1" *ngFor="let project of buildzData.projects">
            <div class="form-check align-middle">
              <input class="form-check-input" type="checkbox"
                     value="{{project}}" [checked]="hasArtifactOf(project)" id="{{project}}"
                     (click)="toggleProject.emit(project)"
              >
              <label class="form-check-label" for="{{project}}">
                {{project}}
              </label>
            </div>
          </div>

        </div>

        <div *ngFor="let artifact of environment.artifacts; let i = index">
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
                    <option *ngFor="let b of buildzData.branches" [value]="b">{{b}}</option>
                  </select>
                </div>

                <div class="form-group" *ngFor="let currentLabel of artifact.labels|keyvalue; let j = index">
                  <label for="curLabel_{{j}}">{{currentLabel.key}}</label>
                  <input type="text" class="form-control form-control-sm" id="curLabel_{{j}}" readonly
                         [value]="currentLabel.value">
                </div>

                <div class="form-group">
                  <label for="labelkey_{{i}}">Label Key</label>
                  <select class="form-control form-control-sm" name="labelkey_{{i}}" id="labelkey_{{i}}"
                          [(ngModel)]="newLabel.key"
                  >
                    <option *ngFor="let lk of buildzData.labelKeys" [value]="lk">{{lk}}</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="labelValue_{{i}}">Label Value</label>
                  <input type="text" class="form-control form-control-sm" id="labelValue_{{i}}" name="labelValue_{{i}}"
                         [(ngModel)]="newLabel.value">
                </div>
                <button class="btn btn-secondary align-self-end" (click)="emitAddLabel(artifact.project)">Add Label</button>
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
                        <b>{{theBuildOf(artifact.project).project}}:{{theBuildOf(artifact.project).branch}}:{{theBuildOf(artifact.project).buildNumber}}</b>
                      </td>
                    </tr>
                    </thead>
                    <tr *ngFor="let l of theBuildOf(artifact.project).labels">
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
  environment: Environment;
  @Input()
  verificationResult: EnvironmentBuilds;
  @Input()
  buildzData: BuildStats;
  @Output()
  toggleProject = new EventEmitter<string>();
  @Output()
  addLabel = new EventEmitter<ArtifactSearchLabel>();
  @Output()
  removeLabel = new EventEmitter<string>();
  @Output()
  verify = new EventEmitter<void>();
  @Output()
  save = new EventEmitter<void>();
  newLabel: ArtifactSearchLabel = {
    projectName: '',
    key: '',
    value: ''
  }

  emitAddLabel(projectName: string): void {
    this.newLabel.projectName = projectName;
    this.addLabel.emit(this.newLabel);
    this.newLabel = {
      projectName: '',
      key: '',
      value: ''
    }
  }

  hasArtifactOf(projectName: string): boolean {
    return this.environment.artifacts?.find((a) => a.project == projectName) != null
  }

  theBuildOf(projectName: string) {
    if (!this.verificationResult) {
      return null;
    }
    if (this.verificationResult?.builds[projectName]) {
      return this.verificationResult?.builds[projectName]
    }
    return null;
  }


}
