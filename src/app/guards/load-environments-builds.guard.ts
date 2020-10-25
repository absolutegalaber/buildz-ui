import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {BuildzApi} from '../service/builds-api.service';
import {catchError, mapTo} from 'rxjs/operators';

@Injectable()
export class LoadEnvironmentsBuildsGuard implements CanActivate {

  constructor(private buildsApi: BuildzApi) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    let environmentName = route.params['environmentName'];
    return this.buildsApi.loadEnvironment(environmentName).pipe(
      mapTo(true),
      catchError((err) => {
        console.log(err)
        return of(false)
      })
    );
  }
}
