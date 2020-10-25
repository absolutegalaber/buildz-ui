import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {BuildzApi} from '../service/builds-api.service';

@Injectable()
export class LoadBuildsSearchGuard implements CanActivate {

  constructor(private buildsApi: BuildzApi) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let projectName = route.params['projectName'];
    if (!!projectName) {
      this.buildsApi.projectSelected(projectName)
    } else {
      this.buildsApi.update()
    }
    return true
  }
}
