import {Component, Input} from '@angular/core';
import {IBuild} from '../../core/flux-store/model';

@Component({
  selector: 'bz-builds-accordion',
  template: `
    <ngb-accordion [closeOthers]="true">
      <ngb-panel *ngFor="let build of builds" title="{{build.project}} :: {{build.branch}} :: {{build.buildNumber}}">
        <ng-template ngbPanelContent>
          <table class="table table-striped table-sm">
            <tr>
              <td colspan="2"><b><bz-build-id [build]="build"></bz-build-id></b></td>
            </tr>
            <tr *ngFor="let label of build.labels | keyvalue">
              <td>{{label.key}}</td>
              <td>{{label.value}}</td>
            </tr>
          </table>
        </ng-template>
      </ngb-panel>
    </ngb-accordion>
  `
})
export class BuildsAccordion {
  @Input()
  builds: IBuild[] = [];
}
