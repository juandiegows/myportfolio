import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../services/setting.service';

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
    ]
  }
  skillActive = {
    "name": "C#",
    "urlImg": "/assets/img/Icons/skills/Csharp.svg",
    "description": "Es un lenguaje de programación orientado a objetos y de propósito general desarrollado por Microsoft. Se utiliza principalmente para desarrollar aplicaciones de escritorio, móviles, web y juegos. C# se basa en el marco .NET y ofrece características avanzadas como la recolección automática de basura y la administración de memoria."
  };
  active: Boolean = false;
  constructor(private setting: SettingService) {

  }
  ngOnInit(): void {
    this.setting.lang$.subscribe(data => {
      this.dataSkill = this.setting.data.skills;
    })
  }
  Open(data:any){
    this.skillActive = data;
    this.active = true;
  }
}
