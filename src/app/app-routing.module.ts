import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePage} from './pages/home.page';
import {BuildsPage} from './pages/builds.page';
import {EnvironmentPage} from './pages/environment.page';
import {LoadEnvironmentGuard} from './guards/load-environment-guard';
import {LoadBuildsSearchGuard} from './guards/load-builds-search-guard.service';
import {NewEnvironmentGuard} from './guards/new-environment-guard';
import {NotFoundGuard} from './guards/not-found.guard';
import {ManagementPage} from './pages/management.page';

const routes: Routes = [
  {path: '', component: HomePage},
  {path: 'builds', component: BuildsPage, canActivate: [LoadBuildsSearchGuard]},
  {path: 'builds-of/:projectName', component: BuildsPage, canActivate: [LoadBuildsSearchGuard]},
  {path: 'edit-environment/:environmentName', component: EnvironmentPage, canActivate: [LoadEnvironmentGuard]},
  {path: 'new-environment', component: EnvironmentPage, canActivate: [NewEnvironmentGuard]},
  {path: 'manage', component: ManagementPage},
  {path: '**', component: HomePage, canActivate: [NotFoundGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
