import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lang, SettingService } from '../../services/setting.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false,
})
export class HomeComponent implements OnInit {
  id: string | null = 'home';
  lang: string = 'es';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly setting: SettingService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((data) => {
      this.id = data.get('id') ?? 'home';
      this.lang = data.get('lang') ?? this.setting.lang;

      // Configurar el idioma
      this.setting.setLang(this.lang === 'en' ? Lang.en : Lang.es);
      if (this.id) {
        setTimeout(() => {
          this.scrollToElement(this.id as string);
        }, 200);
      }
    });
  }

  private scrollToElement(name: string): void {
    // Actualizar la URL con el fragmento y el idioma
    window.history.pushState({}, '', `/${this.lang}/#${name}`);

    const element = document.getElementById(name);
    if (element) {
      const rect = element.getBoundingClientRect();
      const topOffset =
        window.scrollY +
        rect.top -
        5 * parseFloat(getComputedStyle(document.documentElement).fontSize);
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }

  }
}
