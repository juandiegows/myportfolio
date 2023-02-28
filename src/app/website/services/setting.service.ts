import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class SettingService  {


  lang: Lang = Lang.es;
  private _lang = new BehaviorSubject<Lang>(this.lang);
  lang$ = this._lang.asObservable();

  setLang(lang: Lang) {
    this.GetLangText(lang).subscribe(data => {
      this.data =data;
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

  data:any ={
    "navigation": {
      "home": "Inicio ",
      "about_me":"Sobre mi",
      "services":"Servicios",
      "skills":"Habilidades",
      "projects":"Proyectos",
      "blog":"Blog",
      "contact_me": "Contáctame"
    },
    "introduction": {
      "hello": "Hola, Mi nombre es",
      "Iam": "Soy",
      "roles":["Desarrollador web",
      "Desarrollador móvil",
      "Desarrollador full stack",
      "Desarrollador backend",
      "Analista de datos",
      "Desarrollador Vue.js",
      "Desarrollador Angular",
      "Desarrollador .NET",
      "Diseñador UX/UI"
      ],
      "achievements":"Logros destacados",
      "achievements1":"Campeón de worldskills colombia",
      "achievements2":"Campeón de worldskills chile",
      "achievements3":"SubCampeón de worldskills American",
      "achievements4":"Medalla de excelencia worldskils special edition"
    }
  };

  GetLangText(lang:Lang) {
    return this.http.get<any>(`/assets/lang/lang.${lang.toString()}.json`);
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
