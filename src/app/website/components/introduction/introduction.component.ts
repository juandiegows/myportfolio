import { Component, OnInit } from '@angular/core';
import Typed from 'typed.js';
import { Lang, SettingService } from '../../services/setting.service';
import { User } from '../../models/User.model';
import { ApiService } from '../../services/api.service';
import { OutstandingAchievement } from '../../models/OutstandingAchievement';
import { OutstandingAchievementInfo } from '../../models/info/OutstandingAchievementInfo';
import { IntroduccionInfo } from '../../models/info/IntroduccionInfo';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss'],
  standalone: false,
})
export class IntroductionComponent implements OnInit {
  roles: string[] = [
    'Desarrollador web',
    'Desarrollador móvil',
    'Desarrollador full stack',
    'Desarrollador backend',
    'Analista de datos',
    'Desarrollador Vue.js',
    'Desarrollador Angular',
    'Desarrollador .NET',
    'Diseñador UX/UI',
  ];

  options = {
    strings: this.roles,
    typeSpeed: 50,
    backSpeed: 50,
    showCursor: true,
    loop: true,
    smartBackspace: true,
  };

  typed: Typed | null = null;
  userData: User = new User();
  OutstandingAchievements: OutstandingAchievementInfo[] = [];
  OutstandingAchievementsList: OutstandingAchievement[] = [];

  data: IntroduccionInfo = {
    hello: 'Hola, Mi nombre es',
    Iam: 'Soy',
    achievements: 'Logros destacados',
    description:
      'Haz clic para ver más información sobre este logro. Puede ser una noticia, certificación, evidencia del reconocimiento o logro.',
    btnDownload: 'Descargar resumen',
    linkDownload: '/assets/docs/CV/CV_JuanDiegoWS.pdf',
  };

  lang: string = this.setting.lang;
  pdfSrc: string = '';

  constructor(
    private readonly setting: SettingService,
    private readonly apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.initializeTypedEffect();
    this.fetchUserData();
    this.subscribeToLangChanges();
    this.fetchUserOutstandingAchievementData();
  }

  initializeTypedEffect(): void {
    this.typed = new Typed('.typed-element', this.options);
  }

  fetchUserData(): void {
    this.apiService.getUser().subscribe((response: any) => {
      this.userData = response.data as User;
      this.updateRoles();
    });
  }

  fetchUserOutstandingAchievementData(): void {
    this.apiService.getOutstandingAchievements().subscribe((response: any) => {
      this.OutstandingAchievements = this.OutstandingAchievementsList =
        response.data as OutstandingAchievement[];
      this.updateOutstandingAchievements();
    });
  }

  updateOutstandingAchievements(): void {
    this.OutstandingAchievements = this.OutstandingAchievementsList.map(
      (achievement: OutstandingAchievement) => {
        const name =
          this.setting.lang === Lang.es
            ? achievement.spanish_name
            : achievement.name;

        return {
          id: achievement.id,
          name,
          link: achievement.link,
          date: achievement.date,
          user_id: achievement.user_id,
          created_at: achievement.created_at,
          updated_at: achievement.updated_at,
        };
      }
    );
  }

  subscribeToLangChanges(): void {
    this.setting.lang$.subscribe((lang) => {
      this.pdfSrc =
        environment.apiUrlBase +
        '/resume/' +
        this.lang +
        '/' +
        environment.userName +
        '/download';
      this.lang = lang;
      this.data = this.setting.data.introduction;
      this.updateRoles();
      this.updateOutstandingAchievements();
    });
  }

  updateRoles(): void {
    this.data = this.setting.data.introduction;
    if (this.userData.professions.length != 0) {
      if (this.setting.lang == Lang.en) {
        this.roles = this.userData.professions.map(
          (profession) => profession.name
        );
      } else {
        this.roles = this.userData.professions.map(
          (profession) => profession.name_spanish
        );
      }
    }
    this.resetTypedEffect();
  }

  resetTypedEffect(): void {
    this.typed?.destroy();
    this.options = {
      strings: this.roles,
      typeSpeed: 50,
      backSpeed: 50,
      showCursor: true,
      loop: true,
      smartBackspace: true,
    };
    this.typed = new Typed('.typed-element', this.options);
  }
}
