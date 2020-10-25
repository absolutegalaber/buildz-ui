import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BuildStats} from './domain';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class BuildzData {
  private loaded = false;
  private _data = new BehaviorSubject<BuildStats>({
    projects: [],
    branches: [],
    environments: [],
    labelKeys: [],
    numberOfBuilds: 0,
    numberOfLabels: 0
  })

  get data(): BehaviorSubject<BuildStats> {
    return this._data;
  }

  load(): void {

    this.http.get<BuildStats>('/api/v1/builds/stats').pipe(
      map((stats: BuildStats) => {
        this.loaded = true
        this._data.next(stats)
      })
    ).subscribe()
  }

  constructor(private http: HttpClient) {
  }
}
