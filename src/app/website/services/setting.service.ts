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
    this._mode.next(mode);
  }

  data: any = {};
  GetLangText(lang: Lang) {
    return this.http.get<any>(`/assets/lang/lang.${lang.toString()}.json`);
  }
  constructor(private http: HttpClient) {


  }

  init() {
    return this.GetLangText(this.lang).subscribe(data => {
      this.data = data;
    });
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
