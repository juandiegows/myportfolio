import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ColorFilterService } from './color-filter.service';
import { tick } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})

export class SettingService {

  constructor(private http: HttpClient,
    private colorF: ColorFilterService) { }
  lang: Lang = Lang.es;
  private _lang = new BehaviorSubject<Lang>(this.lang);
  lang$ = this._lang.asObservable();
  data: any = {};
  setLang(lang: Lang) {
    localStorage.setItem('lang', lang);
    this.GetLangText(lang).subscribe(data => {
      this.data = data;
      this.lang = lang;
      this._lang.next(lang);
    });

  }


  mode: Mode = Mode.dark;
  private _mode = new BehaviorSubject<Mode>(this.mode);
  mode$ = this._mode.asObservable();

  setMode(mode: Mode) {
    this.mode = mode;
    localStorage.setItem('mode', mode);
    const root = document.documentElement;
    const style = getComputedStyle(root);


    if (this.mode == Mode.dark) {
      root.style.setProperty('--background', style.getPropertyValue('--DarkBackgoundColor'));
      root.style.setProperty('--color', style.getPropertyValue('--DarkColor'));
      root.style.setProperty('--backgroundSecond', style.getPropertyValue('--DarkSecondBackgoundColor'));
      root.style.setProperty('--backgroundDark', style.getPropertyValue('--Dark2SecondBackgoundColor'));
      root.style.setProperty('--GraycColor', '#f3f3f3');
      root.style.setProperty('--YellowColor', '#fcf1c7');
      switch (style.getPropertyValue('--colorPrimary')) {
        case "rgb(198, 159, 0)":
          this.changeColor("rgb(252, 241, 199)");
          break;
        case "rgb(51, 51, 51)":
          this.changeColor("rgb(243, 243, 243)");
          break;
        default:
          break;
      }
    } else {
      root.style.setProperty('--background', style.getPropertyValue('--LightBackgroudColor'));
      root.style.setProperty('--color', style.getPropertyValue('--LightColor'));
      root.style.setProperty('--backgroundSecond', style.getPropertyValue('--LightSecondBackgoundColor'));
      root.style.setProperty('--backgroundDark', style.getPropertyValue('--Light2SecondBackgoundColor'));
      root.style.setProperty('--GraycColor', '#333333');
      root.style.setProperty('--YellowColor', '#c69f00');
      switch (style.getPropertyValue('--colorPrimary')) {
        case "rgb(252, 241, 199)":
          this.changeColor("rgb(198, 159, 0)");
          break;
        case "rgb(243, 243, 243)":
          this.changeColor("rgb(51, 51, 51)");
          break;
        default:
          break;
      }
    }

    this.getColorF();
    this._mode.next(mode);

  }


  getColorF() {
    const root = document.documentElement;
    const style = getComputedStyle(root);
    const colorText = style.getPropertyValue('--colorPrimary');
    this.colorF.hexToRgb(colorText, true);
    let sumColor = this.colorF.r + this.colorF.g + this.colorF.b;
    if (sumColor > 382) {
      this.colorF.r = 0;
      this.colorF.g = 0;
      this.colorF.b = 0;
      const color = style.getPropertyValue('--LightColor');
      root.style.setProperty('--colorD',color);
    } else {
      this.colorF.r = 255;
      this.colorF.g = 255;
      this.colorF.b = 255;
      const color = style.getPropertyValue('--DarkColor');
      root.style.setProperty('--colorD',color);
    }

    const result = this.colorF.solve();
    root.style.setProperty('--colorF', result.filter);
  }

  GetLangText(lang: Lang) {
    return this.http.get<any>(`/assets/lang/lang.${lang.toString()}.json`);
  }

  changeColor(backgroundColor: any) {
    localStorage.setItem('color', backgroundColor);
    const root = document.documentElement;
    const rgbValues = backgroundColor.substring(4, backgroundColor.length - 1)
      .replace(/ /g, '')
      .split(',');
    const red = parseInt(rgbValues[0]);
    const green = parseInt(rgbValues[1]);
    const blue = parseInt(rgbValues[2]);
    this.colorF.set(red, green, blue);
    root.style.setProperty('--colorPrimary', backgroundColor);
    const result = this.colorF.solve();
    root.style.setProperty('--colorPrimaryF', result.filter);
    this.getColorF();
  }


  init() {
    let lang: string | null = localStorage.getItem('lang');
    if (lang != null) {
      this.lang = lang == Lang.en ? Lang.en : Lang.es;
    } else {
      this.lang = Lang.es;
    }

    let mode: string | null = localStorage.getItem('mode');
    if (mode != null) {
      this.setMode(mode == Mode.dark ? Mode.dark : Mode.light);
    }
    let color: string | null = localStorage.getItem('color');
    if (color != null) {
      this.changeColor(color);
    }
    this.setLang(this.lang);
  }

}

export enum Lang {
  en = "en",
  es = "es"
}

export enum Mode {
  dark = "dark",
  light = "ligth"
}
