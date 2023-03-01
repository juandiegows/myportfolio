import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../services/setting.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  data = {
    "title": "Clientes",
    "clients": [
      {
        "name": "Lazos de Dignidad",
        "imgSrc": "/assets/img/Icons/client/Lazos de dignidad.svg",
        "tools": ["php", "MVC", "JQuery", "CSS", "HTML", "POO"],
        "count": 5,
        "year": 2020,
        "url": "https://lazosdedignidad.org/"
      },
      {
        "name": "Monnerverse",
        "imgSrc": "/assets/img/Icons/client/monnerverse.svg",
        "tools": ["Vue.js", "Javascript", "CSS", "HTML"],
        "count": 4,
        "year": 2022,
        "url": "https://www.monnerverse.com/"
      },
      {
        "name": "Vittoria Pizzeria",
        "imgSrc": "/assets/img/Icons/client/vittoria Pizzeria Trattoria.svg",
        "tools": ["Angular", "TypeScript", "SCSS", "HTML"],
        "count": 5,
        "year": 2023,
        "url": "https://vittoriapizzeriaytrattoria.com/"
      }

    ],
    "btnVisit": "Visitar",
    "btnDetails": "Detalles"
  }

  constructor(private setting: SettingService) {

  }
  ngOnInit(): void {
    this.setting.lang$.subscribe(d => {
      this.data = this.setting.data.client;

    })
  }


}
