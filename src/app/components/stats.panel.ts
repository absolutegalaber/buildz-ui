import {Component, Input} from '@angular/core';
import {BuildStats} from '../service/domain';

@Component({
  selector: 'bz-stats',
  template: `
    <span>
      <b>{{stats.projects.length}}</b> Projects.&nbsp;
      <b>{{stats.environments.length}}</b> Environments.&nbsp;
      <b>{{stats.numberOfBuilds}}</b> Builds.&nbsp;
      <b>{{stats.numberOfLabels}}</b> Labels.
    </span>
  `
})
export class StatsPanel {
  @Input()
  stats: BuildStats = {
    projects: [],
    branches: [],
    environments: [],
    numberOfBuilds: 0,
    numberOfLabels: 0,
    labelKeys: []
  }
}
