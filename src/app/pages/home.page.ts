import {Component} from '@angular/core';
import {BuildzData} from '../service/buildz-data.state';
import {EnvironmentsApi} from '../service/environments-api.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BuildsOfEnvironmentDialog} from '../components/builds-of-environment.dialog';
import {ProjectsApi} from '../service/projects-api.service';
import {Router} from '@angular/router';

@Component({
  template: `
    <ng-container *ngIf="{stats: buildzData.data|async, projectData:projectsApi.data | async} as theData">

      <div class="row">
        <div class="col text-center">
          <bz-stats [stats]="theData.stats"></bz-stats>
        </div>
      </div>

      <div class="row">

        <div class="col-6">
          <bz-project-list
            [projects]="theData.projectData.projects"
            (projectSelected)="showBuildzOf($event)"
          ></bz-project-list>
        </div>

        <div class="col-6">
          <bz-environment-list
            [environments]="theData.stats.environments"
            (environmentSelected)="showBuildsOf($event)"
          ></bz-environment-list>
        </div>

      </div>
    </ng-container>
  `
})
export class HomePage {
  showBuildzOf(project: string) {
    this.router.navigate(['/builds-of/', project])
  }

  showBuildsOf(environment: string) {
    this.environmentsApi.loadBuildsOf(environment);
    this.modelService.open(BuildsOfEnvironmentDialog, {size: 'lg'})
  }

  constructor(public buildzData: BuildzData, public projectsApi: ProjectsApi, public environmentsApi: EnvironmentsApi, private modelService: NgbModal, private router: Router) {
  }
}
