import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BuildStats} from '../service/domain';

@Component({
  selector: 'bz-stats',
  template: `
    <div class="row" *ngIf="stats != null">
      <div class="col shadow">
        <table class="table table-striped">
          <thead>
          <tr>
            <td><b>Known Projects</b></td>
          </tr>
          </thead>
          <tbody>
          <tr *ngFor="let project of stats.projects">
            <td>
              <a class="btn" [routerLink]="['/builds-of/', project]">{{project}}</a>
            </td>
          </tr>
          <tr>
            <td class="text-right">
              <a [routerLink]="['/builds']">Browse</a>
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

      <div class="col shadow">
        <table class="table table-striped">
          <thead>
          <tr>
            <td><b>Known Environments</b></td>
          </tr>
          </thead>
          <tbody>
          <tr *ngFor="let environment of stats.environments">
            <td>
              <a class="btn" [routerLink]="['/environment-builds', environment]">{{environment}}</a>
            </td>
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
