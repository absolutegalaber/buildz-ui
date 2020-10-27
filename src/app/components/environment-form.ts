import {Component, Input} from '@angular/core';
import {BuildStats, Environment} from '../service/domain';

@Component({
  selector: 'bz-environment-form',
  template: `
    <div class="container-fluid" *ngIf="environment !== null">
      <form novalidate>

        <div class="form-group">
          <label for="envName">Environment Name</label>
          <input type="text" class="form-control form-control-sm" id="envName" name="envName"
                 [(ngModel)]="environment.name">
        </div>
        <div class="row">
          <button class="btn btn-secondary">Cancel</button>
          <button class="btn btn-primary">Save</button>
        </div>

        <div *ngFor="let artifact of environment.artifacts; let i = index">
          <fieldset class="border rounded p-2">
            <legend class="w-auto">{{i + 1}}. Artifact</legend>
            <div class="form-group">
              <label for="'project_'{{i}}">Project</label>
              <select class="form-control form-control-sm" name="'project_'{{i}}"
                      [(ngModel)]="artifact.project"
              >
                <option *ngFor="let p of buildzData.projects" [value]="p">{{p}}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="'branch_'{{i}}">Branch</label>
              <select class="form-control form-control-sm" name="'branch_'{{i}}"
                      [(ngModel)]="artifact.branch"
              >
                <option *ngFor="let b of buildzData.branches" [value]="b">{{b}}</option>
              </select>
            </div>
          </fieldset>

        </div>

      </form>

    </div>
    <div>
      {{environment |json}}
    </div>
  `
})
export class EnvironmentForm {
  @Input()
  environment: Environment;
  @Input()
  buildzData: BuildStats;
}
