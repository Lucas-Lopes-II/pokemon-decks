export type Theme = 'light' | 'dark';

export enum ThemeEnum {
  DARK = 'dark',
  LIGHT = 'light',
}

export interface IThemeService {
  switchTheme(newTheme: Theme): void;
  useCurrentTheme(): Theme;
}
