import { Component, OnInit } from '@angular/core';
import { Lang, SettingService } from '../../services/setting.service';
import { ApiService } from '../../services/api.service';
import { Services } from '../../models/Services.model';
import { ServicesInfo } from '../../models/info/ServicesInfo.model';

@Component({
  selector: 'app-my-services',
  templateUrl: './my-services.component.html',
  styleUrls: ['./my-services.component.scss'],
})
export class MyServicesComponent implements OnInit {
  services: ServicesInfo[] = [];
  message = "No hay servicios disponibles en este momento.";
  servicesList: Services[] = [];
  data = {
    title: 'Mis Servicios',
    nameButtom: 'Ver resultado',
  };

  constructor(
    private setting: SettingService,
    private apiService: ApiService
  ) { }
  ngOnInit(): void {
    this.apiService.getServices().subscribe((d) => {

      if (d.status != 200) {
        this.servicesList = d.data as Services[];
        this.fillServices();
      } else {
        this.message = "Error al  intentar traer los datos desde el api.";
      }

    },

      (error) => {
        this.message = "Error al  intentar conectar con el api.";
      });
    this.setting.lang$.subscribe((d) => {
      this.data = this.setting.data.services;
      this.fillServices();
    });
  }

  fillServices() {
    this.services = [];
    this.servicesList.forEach((service) => {
      if (this.setting.lang == Lang.en) {
        this.services.push(
          new ServicesInfo(service.title, service.description, '')
        );
      } else {
        this.services.push(
          new ServicesInfo(
            service.spanish_title,
            service.spanish_description,
            ''
          )
        );
      }
    });
  }
}
