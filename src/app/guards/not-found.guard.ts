import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {BuildzAlert} from '../service/buildz-alert.state';

@Injectable()
export class NotFoundGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.buildzAlert.error('Where are you going?', 'You seem to have called an url that does not exist....')
    return true;
  }


  constructor(private buildzAlert: BuildzAlert) {
  }
}
