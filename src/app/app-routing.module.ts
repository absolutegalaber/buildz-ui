import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePage} from './pages/home.page';
import {BuildsPage} from './pages/builds.page';
import {EnvironmentBuildsPage} from './pages/environment-builds.page';
import {LoadEnvironmentsBuildsGuard} from './guards/load-environmentsBuilds.guard';

const routes: Routes = [
  {path: '', component: HomePage},
  {path: 'builds', component: BuildsPage},
  {path: 'environment-builds/:environmentName', component: EnvironmentBuildsPage, canActivate: [LoadEnvironmentsBuildsGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
