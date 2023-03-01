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
    },
    "about_me": {
      "title": "Sobre mi",
      "info": "<p>Soy Juan Diego, un apasionado desarrollador de software especializado en desarrollo web y móvil.</p><p>Representé a Colombia en la competencia WorldSkills 2022 y gané una medalla de excelencia gracias a mis habilidades y conocimientos en diferentes lenguajes de programación, diseño de API, SQL y patrones de diseño.</p>  <p>Me encanta aprender nuevas herramientas y actualizarme día a día con las últimas novedades en tecnología.  Si quieres saber más sobre mi experiencia laboral, echa un vistazo a mi perfil de <a style='color: var(--colorPrimary);' href='https://www.linkedin.com/in/juandiegows/' target='_blank' class='link'>LinkedIn</a> o sigue bajando y mira algunos de mis trabajos.</p>"
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
