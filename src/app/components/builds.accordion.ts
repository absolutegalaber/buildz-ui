import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Build} from '../service/domain';

@Component({
  selector: 'bz-builds-accordion',
  template: `
    <ngb-accordion [closeOthers]="true">
      <ngb-panel *ngFor="let build of searchResult" title="{{build.project}}:{{build.branch}}:{{build.buildNumber}}">
        <ng-template ngbPanelContent>
          <table class="table table-striped table-sm">
            <tr>
              <td colspan="2"><b>{{build.project}}:{{build.branch}}:{{build.buildNumber}}</b></td>
            </tr>
            <tr *ngFor="let label of build.labels">
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
  searchResult: Build[] = [];
  @Output()
  buildSelected = new EventEmitter<Build>();


}
