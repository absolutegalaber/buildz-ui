import {Injectable} from '@angular/core'
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import {BuildStats, EMPTY_BUILD_STATS} from './domain'
import {BehaviorSubject, of} from 'rxjs'
import {catchError, map} from 'rxjs/operators'
import {BuildzAlert} from './buildz-alert.state'

@Injectable()
export class BuildzData {
  private loaded = false
  private _data = new BehaviorSubject<BuildStats>(EMPTY_BUILD_STATS)

  get data(): BehaviorSubject<BuildStats> {
    return this._data
  }

  load(): void {
    this.http.get<BuildStats>('/api/v1/stats').pipe(
      map((stats: BuildStats) => {
        this.loaded = true
        this._data.next(stats)
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        this.buildzAlert.errorOccurred(errorResponse)
        return of(EMPTY_BUILD_STATS)
      })
    ).subscribe()
  }

  constructor(private http: HttpClient, private buildzAlert: BuildzAlert) {
  }
}
