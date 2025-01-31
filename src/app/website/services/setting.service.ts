import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ColorFilterService } from './color-filter.service';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  private readonly _lang = new BehaviorSubject<Lang>(Lang.es);
  lang$ = this._lang.asObservable();

  private readonly _mode = new BehaviorSubject<Mode>(Mode.dark);
  mode$ = this._mode.asObservable();

  private readonly _color = new BehaviorSubject<string>('');
  color$ = this._color.asObservable();

  data: any = {};
  lang: Lang = Lang.es;
  mode: Mode = Mode.dark;
  constructor(
    private readonly http: HttpClient,
    private readonly colorF: ColorFilterService
  ) {}

  setLang(lang: Lang) {
    this.lang = lang;
    localStorage.setItem('lang', lang);
    this.GetLangText(lang).subscribe((data) => {
      this.data = data;
      this._lang.next(lang);
    });
  }

  setMode(mode: Mode) {
    this.mode = mode;
    localStorage.setItem('mode', mode);
    this.applyModeStyles(mode);
    this.getColorF();
    this._mode.next(mode);
  }

  private applyModeStyles(mode: Mode) {
    const root = document.documentElement;
    const style = getComputedStyle(root);
    const isDark = mode === Mode.dark;
    root.style.setProperty(
      '--background',
      style.getPropertyValue(
        isDark ? '--DarkBackgoundColor' : '--LightBackgroudColor'
      )
    );
    root.style.setProperty(
      '--color',
      style.getPropertyValue(isDark ? '--DarkColor' : '--LightColor')
    );
    root.style.setProperty(
      '--backgroundSecond',
      style.getPropertyValue(
        isDark ? '--DarkSecondBackgoundColor' : '--LightSecondBackgoundColor'
      )
    );
    root.style.setProperty(
      '--backgroundDark',
      style.getPropertyValue(
        isDark ? '--Dark2SecondBackgoundColor' : '--Light2SecondBackgoundColor'
      )
    );
    root.style.setProperty('--GraycColor', isDark ? '#f3f3f3' : '#333333');
    root.style.setProperty('--YellowColor', isDark ? '#fcf1c7' : '#c69f00');
    const colorPrimary = style.getPropertyValue('--colorPrimary');
    if (
      (isDark && colorPrimary === 'rgb(198, 159, 0)') ||
      (!isDark && colorPrimary === 'rgb(252, 241, 199)')
    ) {
      this.changeColor(isDark ? 'rgb(252, 241, 199)' : 'rgb(198, 159, 0)');
    } else if (
      (isDark && colorPrimary === 'rgb(51, 51, 51)') ||
      (!isDark && colorPrimary === 'rgb(243, 243, 243)')
    ) {
      this.changeColor(isDark ? 'rgb(243, 243, 243)' : 'rgb(51, 51, 51)');
    }
  }

  getColorF() {
    const root = document.documentElement;
    const style = getComputedStyle(root);
    const colorText = style.getPropertyValue('--colorPrimary');
    this.colorF.hexToRgb(colorText, true);

    const sumColor = this.colorF.r + this.colorF.g + this.colorF.b;
    const isLight = sumColor > 382;

    this.colorF.r = isLight ? 0 : 255;
    this.colorF.g = isLight ? 0 : 255;
    this.colorF.b = isLight ? 0 : 255;
    root.style.setProperty(
      '--colorD',
      style.getPropertyValue(isLight ? '--LightColor' : '--DarkColor')
    );
    root.style.setProperty('--colorF', this.colorF.solve().filter);
  }

  GetLangText(lang: Lang) {
    return this.http.get<any>(`/assets/lang/lang.${lang}.json`);
  }

  changeColor(backgroundColor: string) {
    localStorage.setItem('color', backgroundColor);
    const root = document.documentElement;
    const [red, green, blue] = backgroundColor.match(/\d+/g)!.map(Number);
    this.colorF.set(red, green, blue);
    root.style.setProperty('--colorPrimary', backgroundColor);
    root.style.setProperty('--colorPrimaryF', this.colorF.solve().filter);
    this.getColorF();
    this._color.next(backgroundColor);
  }

  init() {
    const lang = (localStorage.getItem('lang') as Lang) || Lang.es;
    this.setLang(lang);

    const mode = (localStorage.getItem('mode') as Mode) || Mode.dark;
    this.setMode(mode);

    const color = localStorage.getItem('color');
    if (color) this.changeColor(color);
  }
}

export enum Lang {
  en = 'en',
  es = 'es',
}

export enum Mode {
  dark = 'dark',
  light = 'light',
}
