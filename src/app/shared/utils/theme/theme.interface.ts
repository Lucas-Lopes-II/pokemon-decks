export type Theme = 'light' | 'dark';

export interface IThemeService {
  switchTheme(newTheme: Theme): void;
  useCurrentTheme(): Theme;
}
