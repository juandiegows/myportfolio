import { Component, OnInit } from '@angular/core';
import { Lang, SettingService } from '../../services/setting.service';
import { ApiService } from '../../services/api.service';
import { Client } from '../../models/Client.model';
import { ClientInfo } from '../../models/info/ClientInfo.model';
import { ClientLang } from '../../models/lang/ClientLang.model';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  message = 'No hay datos disponibles en este momento.';
  clients: ClientInfo[] = [];
  clientList: Client[] = [];

  data: ClientLang | null = null; 

  isModalVisible = false;

  clientItem: ClientInfo | null = null;

  openModal(client: ClientInfo): void {
    this.clientItem = client;
    this.isModalVisible = true;
  }

  onModalClose(): void {
    this.isModalVisible = false;
  }

  constructor(
    private setting: SettingService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.apiService.getClients().subscribe({
      next: (d) => {
        if (d.status != 200) {
          this.clientList = d.data as Client[];
          this.fillData();
          this.openModal(this.clients[0]);  
        } else {
          this.message = 'Error al  intentar traer los datos desde el api.';
        }
      },
      error: (error) => {
        this.message = 'Error al  intentar conectar con el api.';
      },
    });
    this.setting.lang$.subscribe((d) => {
      this.data = this.setting.data.client;
      this.fillData();
    });
  }

  fillData() {
    this.clients = [];
    this.clientList.forEach((client) => {
      if (this.setting.lang == Lang.en) {
        this.clients.push({
          id: client.id,
          name: client.name,
          description: client.description,
          url_logo: client.url_logo,
          link_site: client.link_site,
          year: client.year,
          topics: client.topics,
          count_participants: client.count_participants,
        });
      } else {
        this.clients.push({
          id: client.id,
          name: client.name,
          description: client.spanish_description,
          url_logo: client.url_logo,
          link_site: client.link_site,
          year: client.year,
          topics: client.topics_spanish,
          count_participants: client.count_participants,
        });
      }
    });
  }
}
