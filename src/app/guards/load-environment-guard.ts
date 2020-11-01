import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, mapTo} from 'rxjs/operators';
import {EnvironmentsApi} from '../service/environments-api.service';
import {BuildzAlert} from '../service/buildz-alert.state';

@Injectable()
export class LoadEnvironmentGuard implements CanActivate {

  constructor(private environmentsApi: EnvironmentsApi, private router: Router, private buildzAlert: BuildzAlert) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    let environmentName = route.params['environmentName'];
    return this.environmentsApi.selectEnvironment(environmentName).pipe(
      mapTo(true),
      catchError((err) => {
        this.buildzAlert.errorOccurred(err)
        return of(false)
      })
    );
  }
}
