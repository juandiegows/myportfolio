import { Component, OnInit } from '@angular/core';
import Typed from 'typed.js';
import { Lang, SettingService } from '../../services/setting.service';
import { User } from '../../models/User.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {

  constructor(private setting: SettingService, private apiService: ApiService) {

  }

  roles: string[] = ["Desarrollador web",
    "Desarrollador móvil",
    "Desarrollador full stack",
    "Desarrollador backend",
    "Analista de datos",
    "Desarrollador Vue.js",
    "Desarrollador Angular",
    "Desarrollador .NET",
    "Diseñador UX/UI"
  ];

  options = {
    strings: this.roles,
    typeSpeed: 50,
    backSpeed: 50,
    showCursor: true,
    loop: true,
    smartBackspace: true

  };

  typed: Typed | null = null;



  userData: User = new User;
  data = {
    "hello": "Hola, Mi nombre es",
    "Iam": "Soy",
    "roles": [],
    "achievements": "Logros destacados",
    "achievements1": "Campeón de worldskills colombia",
    "achievements2": "Campeón de worldskills chile",
    "achievements3": "SubCampeón de worldskills American",
    "achievements4": "Medalla de excelencia worldskils special edition",
    "btnDownload": "Descargar resumen",
    "linkDownload": "/assets/docs/CV/CV_JuanDiegoWS.pdf"
  };
  // Inyecta el servicio en el constructor

  ngOnInit(): void {
    this.typed = new Typed('.typed-element', this.options)
    this.apiService.getUser().subscribe((data: any) => {

      this.userData = data.data as User;
      if (this.userData.professions.length != 0) {
        if (this.setting.lang == Lang.en) {
          this.roles = this.userData.professions.map(profession => profession.name);
        } else {
          this.roles = this.userData.professions.map(profession => profession.name_spanish);
        }
      }
      this.resetType();
    });
    this.setting.lang$.subscribe(data => {

      this.data = this.setting.data.introduction;
      if (this.userData.professions.length != 0) {
        if (this.setting.lang == Lang.en) {
          this.roles = this.userData.professions.map(profession => profession.name);
        } else {
          this.roles = this.userData.professions.map(profession => profession.name_spanish);
        }
      }
      this.resetType();
    });



  }

  resetType() {
    this.typed?.destroy();
    this.options = {
      strings: this.roles,
      typeSpeed: 50,
      backSpeed: 50,
      showCursor: true,
      loop: true,
      smartBackspace: true


    };
    this.typed = new Typed('.typed-element', this.options)
  }




}
