import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePage} from './pages/home.page';
import {BuildsPage} from './pages/builds.page';

const routes: Routes = [
  {path: '', component: HomePage},
  {path: 'builds', component: BuildsPage}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
