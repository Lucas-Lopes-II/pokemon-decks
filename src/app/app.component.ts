import { Component, OnInit } from '@angular/core';

import { initFlowbite } from 'flowbite';
import { ThemeService } from './shared/utils/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private readonly themeService: ThemeService) {
    this.themeService.useCurrentTheme();
  }

  ngOnInit(): void {
    initFlowbite();
  }
}
