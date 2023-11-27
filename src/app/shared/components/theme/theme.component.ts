import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoonIconComponent, SunIconComponent } from './components';
import { Theme, ThemeEnum, ThemeService } from '../../utils/theme';

@Component({
  selector: 'theme',
  standalone: true,
  imports: [CommonModule, SunIconComponent, MoonIconComponent],
  templateUrl: './theme.component.html',
})
export class ThemeComponent {
  public theme: Theme = ThemeEnum.LIGHT;

  constructor(private readonly themeService: ThemeService) {
    this.theme = this.themeService.useCurrentTheme();
  }

  public cheangeTheme(): void {
    this.theme =
      this.theme === ThemeEnum.LIGHT ? ThemeEnum.DARK : ThemeEnum.LIGHT;

    this.themeService.switchTheme(this.theme);
  }
}
