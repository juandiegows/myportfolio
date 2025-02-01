import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Lang, SettingService } from '../../services/setting.service';
import { Topic } from '../../models/Topic.model';
import { TopicInfo } from '../../models/info/TopicInfo.model';
import { ApiService } from '../../services/api.service';
import { Work } from '../../models/Work.model';
import { WorkInfo } from '../../models/info/WorkInfo.model';
import { EducationInfo } from '../../models/info/EducationInfo.model';
import { Education } from '../../models/Education.model';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  standalone: false
})
export class SkillsComponent implements OnInit {

  // Mensajes de estado
  messageSkill = "Consultado los datos...";
  messageWork = "Consultado los datos...";
  messageEducation = "Consultado los datos...";

  // Datos originales
  private skillList: Topic[] = [];
  private worksList: Work[] = [];
  private educationList: Education[] = [];

  // Datos transformados
  skills: TopicInfo[] = [];
  works: WorkInfo[] = [];
  education: EducationInfo[] = [];

  // Datos combinados para experiencia / educación
  workEducation: (WorkInfo | EducationInfo)[] = [];
  filter: number[] = [];

  // Datos activos
  skillActive: Topic = new Topic();
  skillInfoActive: TopicInfo = new TopicInfo();
  itemActive: WorkInfo | EducationInfo = {} as WorkInfo;

  // Configuración y mensajes en función del idioma
  lang: string = "";
  dataSkill = {
    title: "Mi habilidades",
    btnProject: "Ver Proyectos",
    btnExperience: "Ver Experiencia"
  };

  dataExpEdu = {
    title: "Mi experiencia laboral y educación",
    titleExperience: "Experiencia",
    titleEducation: "educación",
    dataExp: {
      subtitle: "Empresa o Clientes",
      titleyear: "años",
      titleClear: "clean filter",
      titleMessage: "You can click on the years to filter"
    },
    dataEdu: {
      subtitle: "Escuela o Entidad",
      titleyear: "años",
      titleClear: "clean filter",
      titleMessage: "You can click on the years to filter"
    },
    textCertificate: "Certificate Download",
    textHelpCertificate: "clic para descargar el certificado"
  };

  dataE = {
    subtitle: "Empresa o Clientes",
    titleyear: "años",
    titleClear: "Limpiar filtro",
    titleMessage: "Puedes darle clic a los años para filtrar"
  };

  active: boolean = false;
  IsExperience: boolean = true;

  constructor(
    private readonly setting: SettingService,
    private readonly apiService: ApiService
  ) { }

  ngOnInit(): void {
    // Suscribirse a cambios de idioma y actualizar textos
    this.setting.lang$.subscribe(langData => {
      this.lang = langData;
      this.dataSkill = this.setting.data.skills;
      this.dataExpEdu = this.setting.data.experienceEducation;
      this.fillData();
    });

    // Realizar las 3 peticiones en paralelo
    forkJoin({
      skillsRes: this.apiService.getSkills(),
      worksRes: this.apiService.getWorks(),
      educationsRes: this.apiService.getEducations()
    }).subscribe({
      next: ({ skillsRes, worksRes, educationsRes }) => {
        // Se asume que cuando status NO es 200 se tiene éxito (según la lógica original)
        if (skillsRes.status !== 200) {
          this.skillList = skillsRes.data as Topic[];
          this.messageSkill = "";
        } else {
          this.messageSkill = "Error al intentar traer los datos desde el api.";
        }

        if (worksRes.status !== 200) {
          this.worksList = worksRes.data as Work[];
          this.messageWork = "";
        } else {
          this.messageWork = "Error al intentar traer los datos desde el api.";
        }

        if (educationsRes.status !== 200) {
          this.educationList = educationsRes.data as Education[];
          this.messageEducation = "";
        } else {
          this.messageEducation = "Error al intentar traer los datos desde el api.";
        }
        this.fillData();
      },
      error: (error) => {
        this.messageSkill = "Error al intentar conectar con el api.";
        this.messageWork = "Error al intentar conectar con el api.";
        this.messageEducation = "Error al intentar conectar con el api.";
      }
    });
  }

  /**
   * Transforma y asigna los datos para skills, works y educación según el idioma.
   */
  fillData(): void {
    // Actualiza skillInfoActive basado en skillActive
    this.skillInfoActive = this.transformTopic(this.skillActive);

    // Transforma lista de skills
    this.skills = this.skillList.map(skill => this.transformTopic(skill));
    if (this.skills.length === 0) {
      this.messageSkill = "No hay habilidades disponibles";
    }

    // Transforma lista de works
    this.works = this.worksList.map(work => this.transformWork(work));
    if (this.works.length === 0) {
      this.messageWork = "No hay experiencia laboral disponibles";
    }

    // Transforma lista de educación
    this.education = this.educationList.map(edu => this.transformEducation(edu));
    if (this.education.length === 0) {
      this.messageEducation = "No hay estudios disponibles";
    }

    // Actualiza la vista de experiencia/educación según el flag actual
    this.ChangeData();
  }

  /**
   * Función helper para transformar un Topic a TopicInfo según el idioma.
   */
  private transformTopic(topic: Topic): TopicInfo {
    return {
      id: topic.id,
      name: this.setting.lang === Lang.en ? topic.name : topic.spanish_name,
      link_image: topic.link_image,
      description: this.setting.lang === Lang.en ? topic.description : topic.spanish_description,
      topic: null,
      type_topic: {
        id: topic.type_topic.id,
        name: this.setting.lang === Lang.en ? topic.type_topic.name : topic.type_topic.spanish_name
      }
    };
  }

  /**
   * Función helper para transformar un Work a WorkInfo según el idioma.
   */
  private transformWork(work: Work): WorkInfo {
    return {
      id: work.id,
      logo: work.logo,
      business: work.business,
      profession: {
        id: work.profession.id,
        name: this.setting.lang === Lang.en ? work.profession.name : work.profession.name_spanish
      },
      description: this.setting.lang === Lang.en ? work.description : work.spanish_description,
      certificate_url: work.certificate_url,
      topics: this.setting.lang === Lang.en ? work.topics : work.topics_spanish,
      start_date: work.start_date,
      end_date: work.end_date
    };
  }

  /**
   * Función helper para transformar un Education a EducationInfo según el idioma.
   */
  private transformEducation(education: Education): EducationInfo {
    return {
      id: education.id,
      entity: education.entity,
      title: this.setting.lang === Lang.en ? education.title : education.spanish_title,
      title_education: this.setting.lang === Lang.en ? education.title_education : education.spanish_title_education,
      description: this.setting.lang === Lang.en ? education.description : education.spanish_description,
      certificate_url: education.certificate_url,
      start_date: education.start_date,
      end_date: education.end_date
    };
  }

  /**
   * Devuelve la lista filtrada de items (works o educaciones) según el filtro de años.
   */
  GetItem(): (WorkInfo | EducationInfo)[] {
    const list = this.IsExperience ? this.works : this.education;
    if (this.filter.length === 0) return list;
    return list.filter(item =>
      this.filter.includes(this.getYearFromDate(item.start_date)) ||
      this.filter.includes(this.getYearFromDate(item.end_date))
    );
  }

  clearFilter(): void {
    this.filter = [];
  }

  setFilter(year: number): void {
    const index = this.filter.indexOf(year);
    if (index > -1) {
      this.filter.splice(index, 1);
    } else {
      this.filter.push(year);
    }
  }

  IsFilter(year: number): boolean {
    return this.filter.includes(year);
  }

  Open(data: TopicInfo, index: number): void {
    this.skillInfoActive = data;
    this.skillActive = this.skillList[index];
    this.active = true;
  }

  OpenExperience(): void {
    this.IsExperience = true;
    this.ChangeData();
  }

  OpenEducation(): void {
    this.IsExperience = false;
    this.ChangeData();
  }

  /**
   * Actualiza la lista combinada y el item activo según la pestaña (experiencia o educación).
   */
  ChangeData(): void {
    this.clearFilter();
    this.workEducation = this.IsExperience ? this.works : this.education;
    this.itemActive = this.workEducation[0];
  }

  getMessage(): string {
    return this.IsExperience ? this.messageWork : this.messageEducation;
  }

  /**
   * Parsea una fecha en distintos formatos a un objeto Date.
   */
  GetDate(_date: string | null): Date {
    if (!_date) return new Date();
    if (_date.includes('/')) {
      const [day, month, year] = _date.split('/').map(Number);
      return new Date(year, month - 1, day);
    }
    return new Date(_date);
  }

  /**
   * Extrae el año de una fecha (cadena) utilizando GetDate.
   */
  private getYearFromDate(dateStr: string | null): number {
    return this.GetDate(dateStr).getFullYear();
  }

  /**
   * Obtiene todos los años relevantes de los items actuales para generar el filtro.
   */
  GetYear(): number[] {
    const years = new Set<number>();
    this.workEducation.forEach(item => {
      years.add(this.getYearFromDate(item.start_date));
      years.add(this.getYearFromDate(item.end_date));
    });
    return Array.from(years).sort((a, b) => a - b);
  }

  // Métodos de apoyo para el template

  isWorkInfo(item: any): boolean {
    return item && item.hasOwnProperty('profession');
  }

  getWorkInfo(item: any): WorkInfo {
    return item as WorkInfo;
  }

  getEducation(item: any): EducationInfo {
    return item as EducationInfo;
  }
}
