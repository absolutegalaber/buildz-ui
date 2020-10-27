import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EMPTY_ENVIRONMENT, EMPTY_ENVIRONMENT_BUILDS, Environment, EnvironmentBuilds} from './domain';
import {BehaviorSubject, Observable} from 'rxjs';
import {first, switchMap, tap} from 'rxjs/operators';

@Injectable()
export class EnvironmentsApi {
  private _editable = false;
  private _currentEnvironmentName: string = '';
  private _environmentName = new BehaviorSubject<string>(this._currentEnvironmentName);
  private _currentEnvironment: Environment = EMPTY_ENVIRONMENT;

  private _environment: Observable<Environment> = this.environmentName.pipe(
    switchMap((envName: string) =>
      this.httpClient.get<Environment>(`/api/v1/environments/${envName}`).pipe(
        tap((env: Environment) => this._currentEnvironment = env)
      ))
  );
  private _environmentBuilds = new BehaviorSubject(EMPTY_ENVIRONMENT_BUILDS);

  selectEnvironment(envName: string) {
    this._environmentName.next(envName);
    return this.environment;
  }

  loadBuildsOf(envName: string): void {
    this.httpClient.get<EnvironmentBuilds>(`/api/v1/builds/of-environment/${envName}`).pipe(
      first(),
      tap((theBuilds: EnvironmentBuilds) => this._environmentBuilds.next(theBuilds))
    ).subscribe();
  }

  get environmentName(): Observable<string> {
    return this._environmentName;
  }

  get environmentBuilds(): Observable<EnvironmentBuilds> {
    return this._environmentBuilds;
  }

  get environment(): Observable<Environment> {
    return this._environment;
  }

  edit() {
    this._editable = true;
  }

  constructor(private httpClient: HttpClient) {
  }
}
