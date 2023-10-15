import { Component, OnInit } from '@angular/core';
import { Lang, SettingService } from '../../services/setting.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  dataSkill = {
    "title": "Mi habilidades",
    "skills": [
      {
        "name": "C#",
        "urlImg": "/assets/img/Icons/skills/Csharp.svg",
        "description": "Es un lenguaje de programación orientado a objetos y de propósito general desarrollado por Microsoft. Se utiliza principalmente para desarrollar aplicaciones de escritorio, móviles, web y juegos. C# se basa en el marco .NET y ofrece características avanzadas como la recolección automática de basura y la administración de memoria."
      }
    ],
    "btnProject": "Ver Proyectos",
    "btnExperience": "Ver Experiencia"
  }
  skillActive = {
    "name": "C#",
    "urlImg": "/assets/img/Icons/skills/Csharp.svg",
    "description": "Es un lenguaje de programación orientado a objetos y de propósito general desarrollado por Microsoft. Se utiliza principalmente para desarrollar aplicaciones de escritorio, móviles, web y juegos. C# se basa en el marco .NET y ofrece características avanzadas como la recolección automática de basura y la administración de memoria."
  };
  dataExpEdu = {
    "title": "Mi experiencia laboral y educación",
    "titleExperience": "Experiencia",
    "titleEducation": "educación",
    "dataExp": {

      "subtitle": "Empresa o Clientes",
      "titleyear": "años",
      "titleClear": "clean filter",
      "titleMessage": "You can click on the years to filter",
      "items": [
        {
          "nameBusiness": "Lazos de dignidad",
          "Description": "Se creó una página web en PHP sin utilizar un Framework, con programación orientada a objetos y conectada a una base de datos MySQL. También se incluyó una sección para los clientes y un panel de administración para gestionar el sitio.",
          "Rol": "Desarrollador web Full Stack",
          "StartDate": "22/05/2020",
          "EndDate": "30/11/2020",
          "tools": ["php", "HTML", "CSS", "POO"]
        }
      ]
    },
    "dataEdu": {

      "subtitle": "Escuela o Entidad",
      "titleyear": "años",
      "titleClear": "clean filter",
      "titleMessage": "You can click on the years to filter",
      "items": [
        {
          "nameBusiness": "Primaria",
          "Description": "Estudio en una primaria en Carrizal, donde aún no tiene luz, internet, nada tecnologico, el pueblo donde nacio Diomedez, y a pensar de no haber tecnologo me logre convertir en el campeón de IT soluciones de software para negocio y ganar medalla de excelencia en corea del sur..",
          "Rol": "hugues Manuel",
          "StartDate": "01/01/2006",
          "EndDate": "07/12/2011",
          "tools": []
        }

      ]
    }


  }
  dataE = {

    "subtitle": "Empresa o Clientes",
    "titleyear": "años",
    "titleClear": "Limpiar filtro",
    "titleMessage": "Puedes darle clic a los años para filtrar",
    "items": [
      {
        "nameBusiness": "Lazos de dignidad",
        "Description": "Se creó una página web en PHP sin utilizar un Framework, con programación orientada a objetos y conectada a una base de datos MySQL. También se incluyó una sección para los clientes y un panel de administración para gestionar el sitio.",
        "Rol": "Desarrollador web Full Stack",
        "StartDate": "22/05/2020",
        "EndDate": "30/11/2020",
        "tools": ["php", "HTML", "CSS", "POO"]
      }
    ]
  }
  item_active = {
    "nameBusiness": "",
    "Description": "",
    "Rol": "",
    "StartDate": "",
    "EndDate": "",
    "tools": [""]
  }
  active: Boolean = false;
  IsExperience: Boolean = true;
  constructor(private setting: SettingService) {

  }
  filter: number[] = []
  GetItem(): any[] {
    if (this.filter.length == 0) {
      return this.dataE.items;
    }

    return this.dataE.items.filter(x => this.filter.includes(this.GetDate(x.StartDate).getFullYear()) || this.filter.includes(this.GetDate(x.EndDate).getFullYear()));
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

  ngOnInit(): void {
    this.setting.lang$.subscribe(data => {
      this.dataSkill = this.setting.data.skills;
      this.dataExpEdu = this.setting.data.experienceEducation;
      this.ChangeData();
    })
  }
  Open(data: any) {
    this.skillActive = data;
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
      this.dataE = this.dataExpEdu.dataExp;
    } else {
      this.dataE = this.dataExpEdu.dataEdu;
    }
    this.item_active = this.dataE.items[0];
  }

  GetDiffMouth(_date1: string, _date2: string): string {
    const date1 = this.GetDate(_date1);
    const date2 = this.GetDate(_date2);
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

  GetDate(_date1: string): Date {
    let dateParts = _date1.split('/');
    return new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
  }
  getFormattedDates(date1: string, date2: string): string {
    const date1Obj = this.GetDate(date1);
    const date2Obj = this.GetDate(date2);

    if (date1Obj.getFullYear() === date2Obj.getFullYear()) {
      return `${date1Obj.getDate()}/${date1Obj.getMonth() + 1} - ${date2Obj.getDate()}/${date2Obj.getMonth() + 1} ${date1Obj.getFullYear()}`;
    } else {
      return `${date1} - ${date2}`;
    }
  }

  GetYear(): number[] {
    let years: number[] = [];
    this.dataE.items.forEach(element => {
      let date = this.GetDate(element.StartDate);
      let datef = this.GetDate(element.EndDate);
      if (!years.includes(date.getFullYear()))
        years.push(date.getFullYear());

      if (!years.includes(datef.getFullYear()))
        years.push(datef.getFullYear());
    });
    return years;
  }




}
