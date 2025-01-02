import { Component, OnInit } from '@angular/core';
import { Lang, SettingService } from '../../services/setting.service';
import { ProjectLang } from '../../models/lang/ProjectLang.model';
import { ProjectInfo } from '../../models/info/ProjectInfo.model';
import { Project } from '../../models/Project.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-projects-card',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  constructor(
    private setting: SettingService,
    private apiService: ApiService
  ) {}
  data: ProjectLang | null = null;

  message = 'No hay proyectos disponibles en este momento.';
  projects: ProjectInfo[] = [];
  projectList: Project[] = [];
  lang: Lang = Lang.es;
  isModalVisible = false;

  projectItem: ProjectInfo  | null = null;  

  openModal(project : ProjectInfo): void {
    this.projectItem = project; 
    this.isModalVisible = true;
  }

  onModalClose(): void {
    this.isModalVisible = false;
  }
  ngOnInit(): void {
    this.apiService.getProjects().subscribe({
      next: (d) => {
        if (d.status != 200) {
          this.projectList = d.data as Project[];
          this.fillProjects();
        } else {
          this.message = 'Error al  intentar traer los datos desde el api.';
        }
      },
      error: (error) => {
        this.message = 'Error al  intentar conectar con el api.';
      },
    });

    this.setting.lang$.subscribe((d) => {
      this.lang = d;
      this.data = this.setting.data.project;
      this.fillProjects();
    });
  }

  fillProjects() {
    this.projects = [];
    this.projectList.forEach((project) => {
      if (this.setting.lang == Lang.en) {
        this.projects.push({
          id: project.id,
          client_id: project.client_id,
          principal_project_id: project.principal_project_id,
          front_page: {
            id: project.front_page.id,
            link: project.front_page.link,
            link_300: project.front_page.link_300,
            link_700: project.front_page.link_700,
            link_900: project.front_page.link_900,
            name: project.front_page.name,
          },
          title: project.title,
          short_description: project.short_description,
          description: project.description,
          view_link: project.view_link,
          download_link: project.download_link,
          video_link: project.video_link,
          date: project.date,
          created_at: project.created_at,
          updated_at: project.updated_at,
        });
      } else {
        this.projects.push({
          id: project.id,
          client_id: project.client_id,
          principal_project_id: project.principal_project_id,
          front_page: {
            id: project.front_page.id,
            link: project.front_page.link,
            link_300: project.front_page.link_300,
            link_700: project.front_page.link_700,
            link_900: project.front_page.link_900,
            name: project.front_page.name_spanish,
          },
          title: project.spanish_title,
          short_description: project.spanish_short_description,
          description: project.spanish_description,
          view_link: project.view_link,
          download_link: project.download_link,
          video_link: project.video_link,
          date: project.date,
          created_at: project.created_at,
          updated_at: project.updated_at,
        });
      }
    });
  }
}
