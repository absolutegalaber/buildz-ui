import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BuildStats} from '../service/domain';

@Component({
  selector: 'bz-stats',
  template: `
    <div class="row" *ngIf="stats != null">
      <div class="col">
        <table class="table table-striped table-sm">
          <thead>
          <tr>
            <td><b>Known Projects</b></td>
          </tr>
          </thead>
          <tbody>
          <tr *ngFor="let project of stats.projects" [routerLink]="['/builds-of/', project]" style="cursor: pointer">
            <td>
              {{project}}
            </td>
          </tr>
          <tr>
            <td class="text-right">
              <a [routerLink]="['/builds']">Browse Builds</a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="col text-center">
        <b>{{stats.projects.length}}</b> Projects.<br>
        <b>{{stats.environments.length}}</b> Environments.<br>
        <b>{{stats.numberOfBuilds}}</b> Builds.<br>
        <b>{{stats.numberOfLabels}}</b> Labels.
      </div>

      <div class="col">
        <table class="table table-striped table-sm">
          <thead>
          <tr>
            <td colspan="2"><b>Known Environments</b></td>
          </tr>
          </thead>
          <tbody>
          <tr *ngFor="let environment of stats.environments" style="cursor: pointer">
            <td (click)="projectSelected.emit(environment)">
              {{environment}}
            </td>
            <td [routerLink]="['/edit-environment', environment]">Edit</td>
          </tr>
          <tr>
            <td class="text-right" colspan="2">New</td>
          </tr>
          </tbody>
        </table>
      </div>

    </div>
  `
})
export class StatsPanel {
  @Input()
  stats: BuildStats
  @Output()
  projectSelected = new EventEmitter<string>();
}
