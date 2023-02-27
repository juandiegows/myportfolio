import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class SettingService {



  lang: Lang = Lang.es;
  private _lang = new BehaviorSubject<Lang>(this.lang);
  lang$ = this._lang.asObservable();

  setLang(lang: Lang) {
    this.lang = lang;
    this._lang.next(lang);
  }


  mode: Mode = Mode.dark;
  private _mode = new BehaviorSubject<Mode>(this.mode);
  mode$ = this._mode.asObservable();

  setMode(mode: Mode) {
    this.mode = mode;
    this._mode.next(mode);
  }



  GetLangText() {
    return   this.http.get<any>(`/assets/lang/lang.${this.lang.toString()}.json`);
  }
  constructor(private http: HttpClient) { }
}
export enum Lang {
  en = "en",
  es = "es"
}
export enum Mode {
  dark = "dark",
  light = "ligth"
}
