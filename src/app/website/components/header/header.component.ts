import { Component, OnInit } from '@angular/core';
import { Lang } from '../../models/lang/lang.model';
import { Navigation } from '../../models/lang/navigation.model';
import { ColorFilterService } from '../../services/color-filter.service';
import { SettingService, Lang as LangEnum, Mode } from '../../services/setting.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  langPage = LangEnum;
  data = {
    "search": "Buscar",
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

  constructor(private setting: SettingService,private router: Router) {
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

  toGo(event: Event, name: string) {
    event.preventDefault(); // Evitar la redirección predeterminada
  
    window.history.pushState({}, '', name);
  
    const element: HTMLElement = document.getElementById(name) as HTMLElement;
    if (element) {
      setTimeout(() => {
        const rect = element.getBoundingClientRect();
        const topOffset = window.scrollY + rect.top - 5 * parseFloat(getComputedStyle(document.documentElement).fontSize);
        window.scrollTo({ top: topOffset, behavior: 'smooth' });
      }, 200);
    } else {
      this.router.navigate([`/${name}`]);
    }
  }
}
