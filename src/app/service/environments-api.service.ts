import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {ArtifactSearchLabel, EMPTY_ENVIRONMENT, EMPTY_ENVIRONMENT_BUILDS, Environment, EnvironmentBuilds} from './domain'
import {BehaviorSubject, Observable} from 'rxjs'
import {tap} from 'rxjs/operators'
import {artifactOf, artifactsForVerification} from './util-functions'
import {BuildzAlert} from './buildz-alert.state'
import {BuildzData} from './buildz-data.state'

@Injectable()
export class EnvironmentsApi {
  private _environmentName = new BehaviorSubject<string>('')
  private _currentEnvironment: Environment = EMPTY_ENVIRONMENT
  private _environment = new BehaviorSubject(this._currentEnvironment)
  private _environmentBuilds = new BehaviorSubject(EMPTY_ENVIRONMENT_BUILDS)
  private _environmentVerificationResult = new BehaviorSubject(EMPTY_ENVIRONMENT_BUILDS)

  selectEnvironment(envName: string) {
    this._environmentName.next(envName)
    this.httpClient.get<Environment>(`/api/v1/environments/${envName}`).pipe(
      tap((res: Environment) => {
        this._currentEnvironment = res
        this._environment.next(this._currentEnvironment)
      })
    ).subscribe()
    return this.environment
  }

  loadBuildsOf(envName: string): void {
    this.httpClient.get<EnvironmentBuilds>(`/api/v1/builds/of-environment/${envName}`).pipe(
      tap((theBuilds: EnvironmentBuilds) => this._environmentBuilds.next(theBuilds))
    ).subscribe()
  }

  toggleRequiredProject(projectName: string) {
    let isPresent = artifactOf(this._currentEnvironment, projectName) != null
    if (isPresent) {
      this.removeRequiredProject(projectName)
    } else {
      this.addRequiredProject(projectName)
    }
    this._environment.next(this._currentEnvironment)
  }

  private addRequiredProject(projectName: string) {
    this._currentEnvironment.artifacts.push({
      project: projectName,
      branch: '',
      labels: {}
    })
  }

  private removeRequiredProject(projectName: string) {
    this._currentEnvironment.artifacts = this._currentEnvironment.artifacts?.filter((a) => a.project != projectName)
  }

  addLabel(newLabel: ArtifactSearchLabel): void {
    let theArtifact = artifactOf(this._currentEnvironment, newLabel.projectName)
    if (!!theArtifact) {
      theArtifact.labels[newLabel.key] = newLabel.value
      this._environment.next(this._currentEnvironment)
    }
  }

  removeLabel(toRemove: ArtifactSearchLabel): void {
    let theArtifact = artifactOf(this._currentEnvironment, toRemove.projectName)
    if (!!theArtifact) {
      delete theArtifact.labels[toRemove.key]
      this._environment.next(this._currentEnvironment)
    }
  }


  verify(): void {
    let artifacts = artifactsForVerification(this._currentEnvironment)
    if (artifacts.length > 0) {
      this.httpClient.post<EnvironmentBuilds>('/api/v1/environments/verify-artifacts', artifacts).pipe(
        tap((response: EnvironmentBuilds) => this._environmentVerificationResult.next(response))
      ).subscribe()
    } else {
      this._environmentVerificationResult.next(EMPTY_ENVIRONMENT_BUILDS)
    }
  }

  save() {
    this.httpClient.post<Environment>('/api/v1/environments/', this._currentEnvironment).pipe(
      tap((saved: Environment) => {
        this._currentEnvironment = saved
        this.buildzAlert.info('Environment saved', `The Enironment was saved successfully <br/>{id=${this._currentEnvironment.id}}`)
        this._environment.next(this._currentEnvironment)
        this.buildzData.load()
      })
    ).subscribe()
  }

  newEnvironment(): void {
    this._currentEnvironment = EMPTY_ENVIRONMENT
    this._environment.next(this._currentEnvironment)
  }

  get environmentBuilds(): Observable<EnvironmentBuilds> {
    return this._environmentBuilds
  }

  get environmentVerificationResult(): Observable<EnvironmentBuilds> {
    return this._environmentVerificationResult
  }

  get environment(): Observable<Environment> {
    return this._environment
  }

  constructor(private httpClient: HttpClient, private buildzAlert: BuildzAlert, private buildzData: BuildzData) {
  }
}
