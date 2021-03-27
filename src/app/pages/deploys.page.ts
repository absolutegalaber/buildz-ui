import {Component} from '@angular/core'
import {Buildz, IDeploySearch, IDeploySearchResult, IServer} from '../core/flux-store/model'
import {select, Store} from '@ngrx/store'
import {theCurrentServer, theDeploysResult, theDeploysSearch} from '../core/flux-store/selectors'
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'
import {CreateReservationDialog} from '../dialogs/create-reservation.dialog'
import {ReleaseReservationDialog} from '../dialogs/release-reservation.dialog'
import {UPDATE_DEPLOY_SEARCH} from '../core/flux-store/server.actions'
import {Observable} from 'rxjs'

@Component({
  template: `
    <div class="container-fluid" *ngIf="{theServer:(server | async), theDeploySearch: (deploysSearch|async|deepClone), theResult: (deploysResult|async) } as data">
      <div class="row">
        <div class="col">
          <h2 class="text-center mt-3">Server: {{data.theServer.name}}</h2>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-10 offset-1">
          <div class="row">
            <div class="col-3">
              <button
                *ngIf="data.theServer.reservation" class="btn btn-primary btn-lg mx-2" (click)="startRelease()">
                Release
              </button>
              <button *ngIf="!data.theServer.reservation" class="btn btn-primary btn-lg mx-2" (click)="startReservation()">
                Reserve
              </button>
            </div>
            <div class="col-6" *ngIf="data.theServer.reservation">
              <strong>By:</strong> {{data.theServer.reservation.by}}<br/>
              <strong>Note:</strong> {{data.theServer.reservation.note}}
            </div>

            <div class="col-3">
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-1">
        <div class="col-10 offset-1">
          <ngb-pagination
            [collectionSize]="data.theResult.totalElements"
            [pageSize]="data.theDeploySearch.pageSize"
            [page]="data.theResult.page+1"
            size="sm"
            (pageChange)="toPage(data.theDeploySearch, $event)"
          ></ngb-pagination>
        </div>
      </div>

      <div class="row mt-1">
        <div class="col-10 offset-1">
          <bz-deploys-accordion
            [searchResult]="data.theResult"
          ></bz-deploys-accordion>
        </div>
      </div>

    </div>
  `
})
// tslint:disable-next-line:component-class-suffix
export class DeploysPage {
  server: Observable<IServer> = this.store.pipe(select(theCurrentServer))
  deploysSearch: Observable<IDeploySearch> = this.store.pipe(select(theDeploysSearch))
  deploysResult: Observable<IDeploySearchResult> = this.store.pipe(select(theDeploysResult))

  constructor(private store: Store<Buildz>, private modelService: NgbModal) {
  }

  startReservation(): void {
    this.modelService.open(CreateReservationDialog, {size: 'lg'})
  }

  startRelease(): void {
    this.modelService.open(ReleaseReservationDialog, {size: 'lg'})
  }

  toPage(deploySearch: IDeploySearch, page: number): void {
    deploySearch.page = page - 1
    this.store.dispatch(UPDATE_DEPLOY_SEARCH({
      newSearch: deploySearch
    }))
  }
}
