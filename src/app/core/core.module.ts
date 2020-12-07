import {NgModule} from '@angular/core';
import {ProjectsEffects} from './flux-store/projects.effects';
import {BuildSearchEffects} from './flux-store/build-search.effects';
import {BuildStatsEffects} from './flux-store/build-stats.effects';
import {CloningPipe} from './pipes/cloning.pipe';

@NgModule({
  declarations: [
    CloningPipe
  ],
  exports: [
    CloningPipe
  ],
  providers: [
    ProjectsEffects,
    BuildSearchEffects,
    BuildStatsEffects
  ]
})
export class CoreModule {
}
