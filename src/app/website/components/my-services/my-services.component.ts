import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../services/setting.service';

@Component({
  selector: 'app-my-services',
  templateUrl: './my-services.component.html',
  styleUrls: ['./my-services.component.scss']
})
export class MyServicesComponent implements OnInit {
  data = {
    "title": "Mis Servicios",
    "services": [
      {
        "title": "Diseño y Desarrollo Web",
        "description": "Diseño y Desarrollo Web personalizado, creando sitios modernos, intuitivos y optimizados para motores de búsqueda (SEO), adaptados a las necesidades de cada cliente.",
        "link": ""
      },
      {
        "title": "Apps Móviles",
        "description": "Desarrollo de aplicaciones móviles personalizada para android, Adaptada a la necesita de cliente.",
        "link": ""
      }, {
        "title": "Desarrollo de escritorio",
        "description": "Desarrollo de programas de escritorio personalizados, adaptados a las necesidades de cada cliente. Creo programas de escritorio de alta calidad, fáciles de usar.",
        "link": ""
      }, {
        "title": "Software a la medida",
        "description": "Creo la solución que necesita tu negocio, esto incluye todo el ciclo de desarrollo desde al analisis de requerimiento hasta mantenimiento.",
        "link": ""
      }, {
        "title": "Clases",
        "description": "Doy clases personales para aquellas personas que necesita reforzar conocimientos o aprender nuevas tecnnologia.",
        "link": ""
      }, {
        "title": "Bases de datos",
        "description": "Creacion y administrador de bases de datos",
        "link": ""
      }, {
        "title": "Diseño y Desarrollo Web",
        "description": "Diseño y Desarrollo Web personalizado, creando sitios modernos, intuitivos y optimizados para motores de búsqueda (SEO), adaptados a las necesidades de cada cliente.",
        "link": ""
      }
    ],
    "nameButtom": "Ver resultado"
  }

  constructor(private setting: SettingService) {


  }
  ngOnInit(): void {
    this.setting.lang$.subscribe(d => {
      this.data = this.setting.data.services;
    })
  }

}
