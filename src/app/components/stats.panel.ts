import {Component, Input} from '@angular/core';
import {BuildStats} from '../service/domain';

@Component({
  selector: 'bz-stats',
  template: `
    <h4>
      <b>{{stats.environments.length}}</b> Environments.&nbsp;
      <b>{{stats.numberOfBuilds}}</b> Builds.&nbsp;
      <b>{{stats.numberOfLabels}}</b> Labels.
    </h4>
  `
})
export class StatsPanel {
  @Input()
  stats: BuildStats = {
    environments: [],
    numberOfBuilds: 0,
    numberOfLabels: 0
  }
}
