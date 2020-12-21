import {Component, Input} from '@angular/core';
import {IBuildStats} from '../../core/flux-store/model';

@Component({
  selector: 'bz-stats',
  template: `
    <h4>
      <b>{{stats.numberOfBuilds}}</b> Builds.
      <b>{{stats.numberOfLabels}}</b> Labels.
      <b>{{stats.numberOfDeploys}}</b> Deploys.
    </h4>
  `
})
export class StatsPanel {
  @Input()
  stats: IBuildStats
}
