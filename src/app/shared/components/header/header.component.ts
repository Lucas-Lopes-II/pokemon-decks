import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeComponent } from '../theme';
import { MenuSidebarComponent } from '../menu-sidebar';
import { NavItemComponent, MenuIconComponent } from './components';

interface LinkItem {
  link: string;
  label: string;
}
@Component({
  selector: 'Header',
  standalone: true,
  imports: [
    CommonModule,
    NavItemComponent,
    ThemeComponent,
    MenuIconComponent,
    MenuSidebarComponent,
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  public readonly linkList: LinkItem[] = [
    {
      link: 'deck-list',
      label: 'Lista de Baralhos',
    },
    {
      link: 'card-list',
      label: 'Lista de Cartas',
    },
  ];
}
