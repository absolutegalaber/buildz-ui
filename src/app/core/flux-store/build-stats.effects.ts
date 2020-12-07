import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, switchMapTo} from 'rxjs/operators';
import {IBuildStats} from './model';
import {buildStatsLoaded, loadBuildStats} from './build-stats.actions';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class BuildStatsEffects {
  loadBuildStats$ = createEffect(() => this.actions$.pipe(
    ofType(loadBuildStats),
    switchMapTo(this.http.get<IBuildStats>(`/api/v1/stats`).pipe(
      map((stats: IBuildStats) => buildStatsLoaded({stats}))
      )
    )
  ))


  constructor(private actions$: Actions, private http: HttpClient) {
  }
}
