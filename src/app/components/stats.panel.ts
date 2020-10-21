import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BuildStats} from '../service/domain';

@Component({
  selector: 'bz-stats',
  template: `
    <div class="row" *ngIf="stats != null">

      <div class="col">
        <div class="row" *ngFor="let project of stats.projects">
          <div class="col">
            <a class="btn" (click)="projectSelected.emit(project)">{{project}}</a>
          </div>
        </div>
      </div>

      <div class="col">
        Currently <b>{{stats.numberOfBuilds}}</b> Builds with <b>{{stats.numberOfLabels}}</b> Labels known to this Build Tool.
      </div>

      <div class="col">
        <div class="row" *ngFor="let environment of stats.environments">
          <div class="col text-right">
            <a class="btn" [routerLink]="['/environment-builds', environment]">{{environment}}</a>
          </div>
        </div>
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
