import {Component} from '@angular/core';
import {BuildsClientService} from '../service/builds-client.service';
import {Observable} from 'rxjs';
import {BuildStats} from '../service/domain';
import {Router} from '@angular/router';

@Component({
  template: `
    <bz-stats [stats]="stats | async" (projectSelected)="projectSelected($event)"></bz-stats>
  `
})
export class HomePage {
  stats: Observable<BuildStats> = this.client.stats()

  projectSelected(projectName: string) {
    this.client.projectSelected(projectName);
    this.router.navigate(['/builds']);
  }

  constructor(private client: BuildsClientService, private router: Router) {
  }
}
