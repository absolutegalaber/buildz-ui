import {NgModule} from '@angular/core';
import {ProjectsEffects} from './flux-store/projects.effects';
import {BuildSearchEffects} from './flux-store/build-search.effects';
import {BuildStatsEffects} from './flux-store/build-stats.effects';
import {CloningPipe} from './pipes/cloning.pipe';
import {EnvironmentEffects} from './flux-store/environment.effects';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const reExport = [
  CommonModule,
  HttpClientModule,
  NgbModule
]

@NgModule({
  imports: [
    ...reExport
  ],
  declarations: [
    CloningPipe
  ],
  exports: [
    ...reExport,
    CloningPipe
  ],
  providers: [
    ProjectsEffects,
    BuildSearchEffects,
    BuildStatsEffects,
    EnvironmentEffects
  ]
})
export class CoreModule {
}
