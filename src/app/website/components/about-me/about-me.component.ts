import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../services/setting.service';

@Component({
    selector: 'app-about-me',
    templateUrl: './about-me.component.html',
    styleUrls: ['./about-me.component.scss'],
    standalone: false
})
export class AboutMeComponent implements OnInit {

  data = {
    "title": "Sobre mi",
    "info": "Soy Juan Diego, un apasionado desarrollador de software especializado en desarrollo web y móvil.  Representé a Colombia en la competencia WorldSkills 2022 y gané una medalla de excelencia gracias a mis habilidades y conocimientos en diferentes lenguajes de programación, diseño de API, SQL y patrones de diseño.  Me encanta aprender nuevas herramientas y actualizarme día a día con las últimas novedades en tecnología.  Si quieres saber más sobre mi experiencia laboral, echa un vistazo a mi perfil de <a href='http://https://www.linkedin.com/in/juandiegows/' target='_blank' class='link'>LinkedIn</a> o sigue bajando y mira algunos de mis trabajos."
  }
  constructor(private setting: SettingService) {

  }
  ngOnInit(): void {
    this.setting.lang$.subscribe(data => {

      this.data =this.setting.data.about_me;
    });
  }
}
