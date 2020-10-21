import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {BuildsApi} from '../service/builds-api.service';
import {mapTo} from 'rxjs/operators';

@Injectable()
export class LoadEnvironmentsBuildsGuard implements CanActivate {

  constructor(private buildsApi: BuildsApi, router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    let environmentName = route.params['environmentName'];
    return this.buildsApi.loadEnvironment(environmentName).pipe(
      mapTo(true),
    );
  }
}
