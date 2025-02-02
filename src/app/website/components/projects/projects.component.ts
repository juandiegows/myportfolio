import { Component, OnInit } from '@angular/core';
import { Lang, SettingService } from '../../services/setting.service';
import { ProjectLang } from '../../models/lang/ProjectLang.model';
import { ProjectInfo } from '../../models/info/ProjectInfo.model';
import { Project } from '../../models/Project.model';
import { ApiService } from '../../services/api.service';
import { TopicInfo } from '../../models/info/TopicInfo.model';
import { TypeTopicInfo } from '../../models/info/TypeTopicInfo.model';

@Component({
  selector: 'app-projects-card',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  standalone: false,
})
export class ProjectsComponent implements OnInit {
  constructor(
    private readonly setting: SettingService,
    private readonly apiService: ApiService
  ) {}
  data: ProjectLang | null = null;

  message = 'No hay proyectos disponibles en este momento.';
  projects: ProjectInfo[] = [];
  projectList: Project[] = [];
  lang: Lang = Lang.es;
  isModalVisible = false;

  projectItem: ProjectInfo | null = null;

  openModal(project: ProjectInfo): void {
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
    this.projects = this.projectList.map((project) => {
      // Mapeo de los topics, asegurando que si no existen se asigne un arreglo vacío
      const topics: TopicInfo[] = (project.topics || []).map((topic) => {
        const topicInfo = new TopicInfo();
        topicInfo.id = topic.id;
        topicInfo.name = this.setting.lang === Lang.en ? topic.name : topic.spanish_name;
        topicInfo.link_image = topic.link_image;
        topicInfo.description = this.setting.lang === Lang.en ? topic.description : topic.spanish_description;
        topicInfo.topic = null;
        topicInfo.type_topic = new TypeTopicInfo();
        return topicInfo;
      });
  
      // Definición compacta del front_page
      const front_page = {
        id: project.front_page.id,
        link: project.front_page.link,
        link_300: project.front_page.link_300,
        link_700: project.front_page.link_700,
        link_900: project.front_page.link_900,
        name: this.setting.lang === Lang.en ? project.front_page.name : project.front_page.name_spanish,
      };
  
      // Retorno del objeto completo según ProjectInfo
      return {
        id: project.id,
        client_id: project.client_id,
        principal_project_id: project.principal_project_id,
        front_page: front_page,
        title: this.setting.lang === Lang.en ? project.title : project.spanish_title,
        short_description: this.setting.lang === Lang.en ? project.short_description : project.spanish_short_description,
        description: this.setting.lang === Lang.en ? project.description : project.spanish_description,
        topics: topics,
        view_link: project.view_link,
        download_link: project.download_link,
        video_link: project.video_link,
        date: project.date,
        created_at: project.created_at,
        updated_at: project.updated_at,
      } as ProjectInfo;
    });
  
  }
  
  
}
