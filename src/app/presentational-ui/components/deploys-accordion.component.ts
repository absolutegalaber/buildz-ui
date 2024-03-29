import {Component, Input} from '@angular/core'
import {IDeploySearchResult} from '../../core/flux-store/model'

@Component({
  selector: 'bz-deploys-accordion',
  template: `

    <ngb-accordion [closeOthers]="true">
      <ngb-panel
        *ngFor="let deploy of searchResult.deploys"
        title="Deploy of {{deploy.build.project}} :: {{deploy.build.branch}} :: {{deploy.build.buildNumber}} - {{deploy.deployedAt | amTimeAgo}}"
      >
        <ng-template ngbPanelContent>
          <h3>Labels</h3>
          <table class="table table-striped table-sm">
            <tr *ngFor="let label of deploy.labels |keyvalue">
              <td>{{label.key}}</td>
              <td>{{label.value}}</td>
            </tr>
          </table>

        </ng-template>
      </ngb-panel>
    </ngb-accordion>
  `
})
export class DeploysAccordionComponent {
  @Input()
  searchResult: IDeploySearchResult
}
