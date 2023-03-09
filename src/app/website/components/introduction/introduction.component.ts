import { Component, OnInit } from '@angular/core';
import Typed from 'typed.js';
import { Lang, SettingService } from '../../services/setting.service';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {

  constructor(private setting: SettingService) {

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



  data = {
    "hello": "Hola, Mi nombre es",
    "Iam": "Soy",
    "roles": ["Desarrollador web",
      "Desarrollador móvil",
      "Desarrollador full stack",
      "Desarrollador backend",
      "Analista de datos (SQL SERVER y MYSQL)",
      "Desarrollador Vue.js",
      "Desarrollador Angular",
      "Desarrollador .NET",
      "diseñador UX/UI"
    ],
    "achievements": "Logros destacados",
    "achievements1": "Campeón de worldskills colombia",
    "achievements2": "Campeón de worldskills chile",
    "achievements3": "SubCampeón de worldskills American",
    "achievements4": "Medalla de excelencia worldskils special edition",
    "btnDownload": "Descargar resumen",
    "linkDownload": "/assets/docs/CV/CV_JuanDiegoWS.pdf"
  };
  ngOnInit(): void {
    this.typed = new Typed('.typed-element', this.options)
    this.setting.lang$.subscribe(data => {

      this.data = this.setting.data.introduction;
      this.roles = this.data.roles;
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
    });



  }




}
