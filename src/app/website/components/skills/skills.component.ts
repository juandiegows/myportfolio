import { Component, OnInit } from '@angular/core';
import { Lang, SettingService } from '../../services/setting.service';
import { Topic } from '../../models/Topic.model';
import { TopicInfo } from '../../models/info/TopicInfo.model';
import { ApiService } from '../../services/api.service';
import { TypeTopicInfo } from '../../models/info/TypeTopicInfo.model';
import { Profession } from '../../models/Profession.model';
import { Work } from '../../models/Work.model';
import { WorkInfo } from '../../models/info/WorkInfo.model';
import { EducationInfo } from '../../models/info/EducationInfo.model';
import { Education } from '../../models/Education.model';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  messageSkill = "Consultado los datos...";
  skills: TopicInfo[] = [];
  skillList: Topic[] = [];


  messageWork = "Consultado los datos...";
  works: WorkInfo[] = [];
  worksList: Work[] = [];

  messageEducation = "Consultado los datos...";
  education: EducationInfo[] = [];
  educationList: Education[] = [];

  workEducation: WorkInfo[] | EducationInfo[] = [];
  filter: number[] = []

  skillActive: Topic = new Topic();
  skillInfoActive: TopicInfo = new TopicInfo();

  dataSkill = {
    "title": "Mi habilidades",
    "btnProject": "Ver Proyectos",
    "btnExperience": "Ver Experiencia"
  }


  dataExpEdu = {
    "title": "Mi experiencia laboral y educación",
    "titleExperience": "Experiencia",
    "titleEducation": "educación",
    "dataExp": {

      "subtitle": "Empresa o Clientes",
      "titleyear": "años",
      "titleClear": "clean filter",
      "titleMessage": "You can click on the years to filter"
    },
    "dataEdu": {

      "subtitle": "Escuela o Entidad",
      "titleyear": "años",
      "titleClear": "clean filter",
      "titleMessage": "You can click on the years to filter"
    }


  }
  dataE = {

    "subtitle": "Empresa o Clientes",
    "titleyear": "años",
    "titleClear": "Limpiar filtro",
    "titleMessage": "Puedes darle clic a los años para filtrar"
  }

  itemActive: WorkInfo | EducationInfo = new Work;

  active: Boolean = false;
  IsExperience: Boolean = true;
  constructor(
    private setting: SettingService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {

    this.apiService.getSkills()
      .subscribe({
        next: d => {
          if (d.status != 200) {
            this.skillList = d.data as Topic[];
            this.messageSkill = "";
            this.fillData();
          } else {
            this.messageSkill = "Error al  intentar traer los datos desde el api.";
          }
        },
        error: (error) => {
          this.messageSkill = "Error al  intentar conectar con el api.";
        }
      });

    this.apiService.getWorks()
      .subscribe({
        next: d => {
          if (d.status != 200) {
            this.worksList = d.data as Work[];
            this.messageWork = "";
            this.fillData();
          } else {
            this.messageWork = "Error al  intentar traer los datos desde el api.";
          }
        },
        error: (error) => {
          this.messageWork = "Error al  intentar conectar con el api.";
        }
      });

    this.apiService.getEducations()
      .subscribe({
        next: d => {
          if (d.status != 200) {
            this.educationList = d.data as Education[];
            this.messageEducation = "";
            this.fillData();
          } else {
            this.messageEducation = "Error al  intentar traer los datos desde el api.";
          }
        },
        error: (error) => {
          this.messageEducation = "Error al  intentar conectar con el api.";
        }
      });

    this.setting.lang$.subscribe(data => {
      this.dataSkill = this.setting.data.skills;
      this.dataExpEdu = this.setting.data.experienceEducation;
      this.ChangeData();
      this.fillData();
    })
  }

  fillData() {
    if (this.setting.lang == Lang.en) {
      this.skillInfoActive =
      {
        id: this.skillActive.id,
        name: this.skillActive.name,
        link_image: this.skillActive.link_image,
        description: this.skillActive.description,
        topic: null,
        type_topic: {
          id: this.skillActive.type_topic.id,
          name: this.skillActive.type_topic.name
        }
      }
        ;
    } else {
      this.skillInfoActive =
      {
        id: this.skillActive.id,
        name: this.skillActive.spanish_name,
        link_image: this.skillActive.link_image,
        description: this.skillActive.spanish_description,
        topic: null,
        type_topic: {
          id: this.skillActive.type_topic.id,
          name: this.skillActive.type_topic.spanish_name
        }
      }
        ;
    }

    this.skills = [];
    this.skillList.forEach((skill) => {
      if (this.setting.lang == Lang.en) {
        this.skills.push(
          {
            id: skill.id,
            name: skill.name,
            link_image: skill.link_image,
            description: skill.description,
            topic: null,
            type_topic: {
              id: skill.type_topic.id,
              name: skill.type_topic.name
            }
          }
        );
      } else {
        this.skills.push(
          {
            id: skill.id,
            name: skill.spanish_name,
            link_image: skill.link_image,
            description: skill.spanish_description,
            topic: null,
            type_topic: {
              id: skill.type_topic.id,
              name: skill.type_topic.spanish_name
            }
          }
        );
      }
    });


    if (this.skills.length == 0) {
      this.messageSkill = "No hay habilidades disponibles";
    }


    this.works = [];
    this.worksList.forEach((work) => {
      if (this.setting.lang == Lang.en) {
        this.works.push(
          {
            id: work.id,
            logo: work.logo,
            business: work.business,
            profession: {
              id: work.profession.id,
              name: work.profession.name,

            },
            description: work.description,
            certificate_url: work.certificate_url,
            topics: work.topics,
            start_date: work.start_date,
            end_date: work.end_date
          }
        );
      } else {
        this.works.push(
          {
            id: work.id,
            logo: work.logo,
            business: work.business,
            profession: {
              id: work.profession.id,
              name: work.profession.name_spanish,

            },
            description: work.spanish_description,
            certificate_url: work.certificate_url,
            topics: work.topics_spanish,
            start_date: work.start_date,
            end_date: work.end_date
          }
        );
      }
    });


    if (this.works.length == 0) {
      this.messageWork = "No hay experiencia laboral disponibles";
    }



    this.education = [];
    this.educationList.forEach((education) => {
      if (this.setting.lang == Lang.en) {
        this.education.push(
          {
            id: education.id,
            entity: education.entity,
            title: education.title,
            title_education: education.title_education,
            description: education.description,
            certificate_url: education.certificate_url,
            start_date: education.start_date,
            end_date: education.end_date
          }
        );
      } else {
        this.education.push(
          {
            id: education.id,
            entity: education.entity,
            title: education.spanish_title,
            title_education: education.spanish_title_education,
            description: education.spanish_description,
            certificate_url: education.certificate_url,
            start_date: education.start_date,
            end_date: education.end_date
          }
        );
      }
    });


    if (this.education.length == 0) {
      this.messageEducation = "No hay estudios disponibles";
    }
    this.ChangeData();
  }



  GetItem(): any[] {
    if (this.filter.length == 0) {
      if (this.IsExperience) {
        return this.works;
      } else {
        return this.education;
      }
    }
    if (this.IsExperience) {
      return this.works.filter(x =>
        this.filter.includes(this.GetDate(x.start_date).getFullYear()) ||
        this.filter.includes(this.GetDate(x.end_date).getFullYear())
      );
    } else {
      return this.education.filter(x =>
        this.filter.includes(this.GetDate(x.start_date).getFullYear()) ||
        this.filter.includes(this.GetDate(x.end_date).getFullYear())
      );
    }

  }

  clearFilter() {
    this.filter = [];
  }

  setFilter(year: number) {
    if (this.filter.includes(year)) {
      this.filter.splice(this.filter.indexOf(year), 1);
    } else {
      this.filter.push(year);
    }
  }

  IsFilter(year: number): boolean {
    return this.filter.includes(year);
  }



  Open(data: TopicInfo, index: number) {
    this.skillInfoActive = data;
    this.skillActive = this.skillList[index];
    this.active = true;
  }

  OpenExperience() {
    this.IsExperience = true;
    this.ChangeData();
  }

  OpenEducation() {
    this.IsExperience = false;
    this.ChangeData();
  }


  ChangeData() {
    this.clearFilter();
    if (this.IsExperience) {
      this.workEducation = this.works;
    } else {
      this.workEducation = this.education;
    }
    this.itemActive = this.workEducation[0];
  }

  getMessage(): string {
    if (this.IsExperience) {
      return this.messageWork;
    } else {
      return this.messageEducation;
    }
  }

  GetDiffMouth(_date1: string, _date2: string | null): string {

    const date1 = this.GetDate(_date1);
    const date2 = _date2 ? this.GetDate(_date2) : new Date();
    const diferenciaEnMs = date2.getTime() - date1.getTime();
    const years = Math.floor(diferenciaEnMs / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor((diferenciaEnMs % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor((diferenciaEnMs % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    let result = " ";
    if (years > 0) {
      result += `${years} ${this.setting.lang == Lang.en ? "Years" : "Años"}`;
    }
    if (months > 0) {
      result += ` ${months} ${this.setting.lang == Lang.en ? "Mouth" : "Meses"} `;
    }
    if (days > 0) {
      result += ` ${days} ${this.setting.lang == Lang.en ? "Days" : "Días"} `;
    }

    return result.trim() || 'Hoy';
  }

  GetDate(_date1: string | null): Date {
    if (_date1 == null) {
      return new Date();
    }
    if (_date1.includes('/')) {
      let dateParts = _date1.split('/');
      return new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
    } else {
      return new Date(_date1);
    }

  }

  getFormattedDates(date1: string, date2: string | null): string {

    const date1Obj = this.GetDate(date1);
    const date2Obj = date2 ? this.GetDate(date2) : new Date();

    if (date1Obj.getFullYear() === date2Obj.getFullYear()) {
      if (date2 == null) {
        return `${date1Obj.getDate()}/${date1Obj.getMonth() + 1} - Actualmente`;
      }
      return `${date1Obj.getDate()}/${date1Obj.getMonth() + 1} - ${date2Obj.getDate()}/${date2Obj.getMonth() + 1} ${date1Obj.getFullYear()}`;
    } else {
      if (date2 == null) {
        return `${date1} - Actualmente`;
      }
      return `${date1} - ${date2}`;
    }
  }

  GetYear(): number[] {
    let years: number[] = [];
    this.workEducation.forEach(element => {
      let dateFinal = new Date().toISOString().slice(0, 10);
      if (element.end_date != null) {
        dateFinal = element.end_date;
      }
      let date = this.GetDate(element.start_date);
      let datef = this.GetDate(dateFinal);
      if (!years.includes(date.getFullYear()))
        years.push(date.getFullYear());

      if (!years.includes(datef.getFullYear()))
        years.push(datef.getFullYear());
    });
    return years;
  }


  isWorkInfo(item: any): boolean {
    return item.hasOwnProperty('profession');
  }



  getWorkInfo(item: any): WorkInfo {
    return item as WorkInfo;
  }

  getEducation(item: any): EducationInfo {
    return item as EducationInfo;
  }

}
