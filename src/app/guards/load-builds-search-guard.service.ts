import {Injectable} from '@angular/core'
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router'
import {Store} from '@ngrx/store'
import {Buildz} from '../core/flux-store/model'
import {searchBuildsOfProject} from '../core/flux-store/build-search.actions'

@Injectable()
export class LoadBuildsSearchGuard implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const project = route.params.projectName
    if (!!project) {
      this.store.dispatch(searchBuildsOfProject({project}))
    }
    return true
  }

  constructor(private store: Store<Buildz>) {
  }
}
