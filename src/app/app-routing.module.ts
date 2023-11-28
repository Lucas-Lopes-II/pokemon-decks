import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeckListComponent } from './pages/deck-list';

const routes: Routes = [
  {
    path: 'deck-list',
    component: DeckListComponent,
  },
  {
    path: 'card-list',
    loadComponent: () =>
      import('./pages/card-list').then((e) => e.CardListComponent),
  },
  {
    path: 'deck-register',
    loadComponent: () =>
      import('./pages/deck-form').then((e) => e.DeckFormComponent),
  },
  {
    path: 'deck/:id',
    loadComponent: () =>
      import('./pages/deck-form').then((e) => e.DeckFormComponent),
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
