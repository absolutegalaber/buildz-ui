import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ArtifactSearchLabel, BuildStats, Environment, EnvironmentBuilds, SearchLabel} from '../service/domain';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddLabelDialog} from './add-label.dialog';

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
              <button class="btn btn-secondary" (click)="verify.emit()">Verify</button>
              <button class="btn btn-primary" [disabled]="!environmentForm.valid" (click)="save.emit()">Save</button>
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

                <div class="form row" *ngFor="let currentLabel of artifact.labels|keyvalue; let j = index">

                  <div class="col-9">
                    <div class="form-group">
                      <label for="curLabel_{{j}}">{{currentLabel.key}}</label>
                      <input type="text" class="form-control form-control-sm" id="curLabel_{{j}}" readonly
                             [value]="currentLabel.value">
                    </div>
                  </div>

                  <div class="col-3 text-left align-content-center">
                    <button class="btn btn-sm btn-danger" (click)="removeLabel.emit({projectName:artifact.project, key:currentLabel.key, value:currentLabel.value})">X</button>
                  </div>

                </div>

                <button class="btn btn-sm btn-secondary align-self-end" (click)="openAddLabelDialog(artifact.project)">Add Label</button>
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
  removeLabel = new EventEmitter<ArtifactSearchLabel>();
  @Output()
  verify = new EventEmitter<void>();
  @Output()
  save = new EventEmitter<void>();

  openAddLabelDialog(projectName: string) {
    let ref = this.modal.open(AddLabelDialog);
    ref.result.then((theNewLabel: SearchLabel) => {
      this.addLabel.emit({
        projectName: projectName,
        key: theNewLabel.key,
        value: theNewLabel.value
      });
    })
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


  constructor(private modal: NgbModal) {
  }
}
