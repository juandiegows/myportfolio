import { Component, OnInit } from '@angular/core';
import { Lang } from '../../models/lang/lang.model';
import { Navigation } from '../../models/lang/navigation.model';
import { ColorFilterService } from '../../services/color-filter.service';
import { SettingService, Lang as LangEnum, Mode } from '../../services/setting.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  langPage = LangEnum;
  data = {
    "home": "Inicio ",
    "about_me": "Sobre mi",
    "services": "Servicios",
    "skills": "Habilidades",
    "projects": "Proyectos",
    "blog": "Blog",
    "contact_me": "Contáctame"
  };
  lang = this.langPage.en;
  darkMode: boolean = true;
  expanded = false;

  constructor(private setting: SettingService) {
    this.lang = setting.lang;
  }
  ngOnInit(): void {
    this.setting.lang$.subscribe(data => {
      this.data = this.setting.data.navigation;
    })
    this.setting.mode$.subscribe(data => {
      this.darkMode = data == Mode.dark;
    });
  }


  changesLang(lang: LangEnum) {
    this.setting.setLang(lang);
    this.lang = lang;
  }

  toGo(name: string) {
    window.history.pushState({}, '', name);
    setTimeout(() => {
      const element: HTMLElement = document.getElementById(name) as HTMLElement;
      const rect = element.getBoundingClientRect();
      const topOffset = window.pageYOffset + rect.top - 5 * parseFloat(getComputedStyle(document.documentElement).fontSize);
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }, 200);
  }

}
