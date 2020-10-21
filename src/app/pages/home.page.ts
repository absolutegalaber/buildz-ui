import {Component} from '@angular/core';
import {BuildsApi} from '../service/builds-api.service';
import {Observable} from 'rxjs';
import {BuildStats} from '../service/domain';
import {Router} from '@angular/router';

@Component({
  template: `
    <bz-stats [stats]="stats | async" (projectSelected)="projectSelected($event)"></bz-stats>
  `
})
export class HomePage {
  stats: Observable<BuildStats> = this.buildsApi.stats()

  projectSelected(projectName: string) {
    this.buildsApi.projectSelected(projectName);
    this.router.navigate(['/builds']);
  }

  constructor(private buildsApi: BuildsApi, private router: Router) {
  }
}
