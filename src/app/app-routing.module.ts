import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: AppComponent,
  // },
  // {
  //   path: '**',
  //   pathMatch: 'full',
  //   redirectTo: 'dack-list',
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
