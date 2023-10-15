import { Component } from '@angular/core';
import { SettingService } from '../../services/setting.service';
import { FooterData } from '../../models/lang/footerData.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  year = new Date().getFullYear();
  data = {
    "home": "Inicio ",
    "about_me": "Sobre mi",
    "services": "Servicios",
    "skills": "Habilidades",
    "projects": "Proyectos",
    "blog": "Blog",
    "contact_me": "Contáctame"
  };

  dataFooter: FooterData | null = null;

  constructor(private setting: SettingService) {

  }
  ngOnInit(): void {
    this.setting.lang$.subscribe(data => {
      this.data = this.setting.data.navigation;
      this.dataFooter = this.setting.data.footer;
    })
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
