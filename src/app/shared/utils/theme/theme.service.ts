import { Injectable } from '@angular/core';

import { LocalStorageService } from '../local-storage';
import { IThemeService, Theme } from './theme.interface';

@Injectable({
  providedIn: 'root',
})
export class ThemeService implements IThemeService {
  constructor(private readonly localStorage: LocalStorageService) {}

  public switchTheme(newTheme: Theme): void {
    const html = document.querySelector('html');
    const currentTheme = this.localStorage.get('theme') as 'light' | 'dark';

    if (newTheme === currentTheme) {
      html?.classList.remove('light', 'dark');
      html?.classList.add(currentTheme);

      return;
    }

    this.localStorage.set('theme', newTheme);
    html?.classList.remove('light', 'dark');
    html?.classList.add(newTheme);
  }

  public useCurrentTheme(): Theme {
    const currentTheme = this.localStorage.get('theme') as Theme | null;
    const html = document.querySelector('html');
    const theme = currentTheme ? currentTheme : 'light';
    html?.classList.remove('light', 'dark');
    html?.classList.add(theme);

    return theme;
  }
}
