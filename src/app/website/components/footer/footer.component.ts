import { Component } from '@angular/core';
import { Lang, SettingService } from '../../services/setting.service';
import { FooterData } from '../../models/lang/footerData.model';
import { User } from '../../models/User.model';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: false
})
export class FooterComponent {
  year = new Date().getFullYear();
  data = {
    home: 'Inicio ',
    about_me: 'Sobre mi',
    services: 'Servicios',
    skills: 'Habilidades',
    projects: 'Proyectos',
    blog: 'Blog',
    contact_me: 'Contáctame',
  };

  dataFooter: FooterData | null = null;
  userData: User = new User();
  count = 1;
  servicesAvailable: boolean = false;

  constructor(
    private setting: SettingService,
    private apiService: ApiService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.apiService.getVisit().subscribe({
      next: (r) => {
        this.count = r.count;
      },
      error: (error) => {
        this.count = -1;
      },
    });
    this.apiService.getUser().subscribe((data: any) => {
      this.userData = data.data as User;
    });

    this.setting.lang$.subscribe((data) => {
      this.data = this.setting.data.navigation;
      this.dataFooter = this.setting.data.footer;
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

  toGo(event: Event, name: string) {
    event.preventDefault(); // Evitar la redirección predeterminada

    window.history.pushState({}, '', name);

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
      this.router.navigate([`/${name}`]);
    }
  }
}
