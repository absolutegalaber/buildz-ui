import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePage} from './pages/home.page';
import {BuildsPage} from './pages/builds.page';
import {EnvironmentPage} from './pages/environment.page';
import {LoadEnvironmentGuard} from './guards/load-environment-guard';
import {LoadBuildsSearchGuard} from './guards/load-builds-search-guard.service';

const routes: Routes = [
  {path: '', component: HomePage},
  {path: 'builds', component: BuildsPage, canActivate: [LoadBuildsSearchGuard]},
  {path: 'builds-of/:projectName', component: BuildsPage, canActivate: [LoadBuildsSearchGuard]},
  {path: 'edit-environment/:environmentName', component: EnvironmentPage, canActivate: [LoadEnvironmentGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
