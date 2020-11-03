import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {EnvironmentsApi} from '../service/environments-api.service';

@Injectable()
export class NewEnvironmentGuard implements CanActivate {

  constructor(private environmentsApi: EnvironmentsApi) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.environmentsApi.newEnvironment();
    return true
  }
}
