import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePage} from './pages/home.page';
import {BuildsPage} from './pages/builds.page';
import {EnvironmentBuildsPage} from './pages/environment-builds.page';
import {LoadEnvironmentsBuildsGuard} from './guards/load-environments-builds.guard';
import {LoadBuildsSearchGuard} from './guards/load-builds-search-guard.service';

const routes: Routes = [
  {path: '', component: HomePage},
  {path: 'builds', component: BuildsPage, canActivate: [LoadBuildsSearchGuard]},
  {path: 'builds-of/:projectName', component: BuildsPage, canActivate: [LoadBuildsSearchGuard]},
  {path: 'environment-builds/:environmentName', component: EnvironmentBuildsPage, canActivate: [LoadEnvironmentsBuildsGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
