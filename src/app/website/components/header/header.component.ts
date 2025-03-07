import { Component, HostListener, OnInit } from '@angular/core';
import {
  SettingService,
  Lang as LangEnum,
  Mode,
} from '../../services/setting.service';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false,
})
export class HeaderComponent implements OnInit {
  langPage = LangEnum;
  data = {
    search: 'Buscar',
    home: 'Inicio ',
    about_me: 'Sobre mi',
    services: 'Servicios',
    skills: 'Habilidades',
    projects: 'Proyectos',
    blog: 'Blog',
    contact_me: 'Contáctame',
  };
  lang = this.langPage.en;
  darkMode: boolean = true;
  expanded = false;
  servicesAvailable: boolean = false;

  constructor(
    private readonly setting: SettingService,
    private readonly router: Router,
    private readonly apiService: ApiService
  ) {
    this.lang = setting.lang;
  }

  ngOnInit(): void {
    this.setting.lang$.subscribe((data) => {
      this.data = this.setting.data.navigation;
    });

    this.setting.mode$.subscribe((data) => {
      this.darkMode = data == Mode.dark;
    });

    this.apiService.getServices().subscribe({
      next: (services) => {
        if (services.status != 200) {
          this.servicesAvailable = services && services.data.length > 0;
        } else {
          this.servicesAvailable = false;
        }
      },
      error: (error) => {
        this.servicesAvailable = false;
      },
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.checkScroll();
  }

  private checkScroll(): void {
    const header = document.querySelector<HTMLElement>('.container__header');
    if (header) {
      if (window.scrollY > 20) {
        header.style.backgroundColor = 'var(--background)';
      } else {
        header.style.backgroundColor = 'transparent';
      }
    }
  }

  changesLang(lang: LangEnum) {
    this.setting.setLang(lang);
    this.lang = lang;

    // Obtener la URL actual
    const { pathname, search, hash } = window.location;

    // Reemplazar el idioma en la ruta sin perder el resto de la URL
    const newPath =
      pathname.replace(/\/(en|es)\//, `/${this.lang}/`) || `/${this.lang}/`;

    // Actualizar la URL sin redirigir
    const updatedUrl = `${newPath}${search}${hash}`;
    if (window.location.href !== updatedUrl) {
      window.history.pushState({}, '', updatedUrl);
    }
  }

  toGo(event: Event, name: string) {
    event.preventDefault(); // Evitar la redirección predeterminada

    const currentUrl = this.router.url.split('#')[0]; // Obtener la URL base sin el fragmento
    const homeUrl = '/'; // Definir la URL del home

    if (currentUrl !== homeUrl) {
      // Navegar al inicio antes de continuar
      this.router.navigate([homeUrl]).then(() => {
        this.handleScroll(name); // Llamar a la función de desplazamiento
      });
    } else {
      // Si ya estamos en el home, proceder directamente
      this.handleScroll(name);
    }
  }

  private handleScroll(name: string) {
    // Actualizar la URL con el fragmento
    window.history.pushState({}, '', `/${this.lang}/#${name}`);

    const element: HTMLElement = document.getElementById(name) as HTMLElement;
    if (element) {
      setTimeout(() => {
        const rect = element.getBoundingClientRect();
        const topOffset =
          window.scrollY +
          rect.top -
          5 * parseFloat(getComputedStyle(document.documentElement).fontSize);
        window.scrollTo({ top: topOffset, behavior: 'smooth' });
      }, 200);
    } else {
      // Si no se encuentra el elemento, navegar a la ruta con el fragmento
      this.router.navigate([], { fragment: name });
    }
  }
}
