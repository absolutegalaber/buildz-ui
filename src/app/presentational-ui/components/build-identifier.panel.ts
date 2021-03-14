import {Component, Input} from '@angular/core';
import {IBuild} from '../../core/flux-store/model';

@Component({
  selector: 'bz-build-id',
  template: `
    <span ngbTooltip="BuildBuddy-ID={{build.id}}" placement="right">{{build.project}}&nbsp;::&nbsp;{{build.branch}}&nbsp;::&nbsp;{{build.buildNumber}}</span>
  `
})
export class BuildIdentifierPanel {
  @Input()
  build: IBuild;
}
