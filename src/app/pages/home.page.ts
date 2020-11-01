import {Component} from '@angular/core';
import {BuildzData} from '../service/buildz-data.state';
import {EnvironmentsApi} from '../service/environments-api.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BuildsOfEnvironmentDialog} from '../components/builds-of-environment.dialog';

@Component({
  template: `
    <ng-container *ngIf="buildzData.data|async as theData">

      <div class="row">
        <div class="col text-center">
          <bz-stats [stats]="theData"></bz-stats>
        </div>
      </div>

      <div class="row">

        <div class="col-6">
          <bz-project-list
            [projects]="theData.projects"
          ></bz-project-list>
        </div>

        <div class="col-6">
          <bz-environment-list
            [environments]="theData.environments"
            (environmentSelected)="showBuildsOf($event)"
          ></bz-environment-list>
        </div>

      </div>
    </ng-container>
  `
})
export class HomePage {
  showBuildsOf(environment: string) {
    this.environmentsApi.loadBuildsOf(environment);
    this.modelService.open(BuildsOfEnvironmentDialog, {size: 'lg'})
  }

  constructor(public buildzData: BuildzData, public environmentsApi: EnvironmentsApi, private modelService: NgbModal) {
  }
}
