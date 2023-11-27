import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeckListComponent } from './pages/deck-list';

const routes: Routes = [
  {
    path: 'deck-list',
    children: [
      {
        path: '',
        component: DeckListComponent,
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'deck-list',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
