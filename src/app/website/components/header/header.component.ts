import { Component, OnInit } from '@angular/core';
import { Lang } from '../../models/lang/lang.model';
import { Navigation } from '../../models/lang/navigation.model';
import { ColorFilterService } from '../../services/color-filter.service';
import { SettingService, Lang as LangEnum } from '../../services/setting.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  langPage = LangEnum;
  data: Lang = {
    navigation: {
      home: 'Home',
      about_me: 'About me',
      services: 'Services',
      skills: 'Skills',
      projects: 'Projects',
      blog: 'Blog',
      contact_me: 'Contact me'
    }
  };
  lang = this.langPage.en;
  color :any = "ada";

  constructor(private setting: SettingService) {
    this.lang = setting.lang;
  }
  ngOnInit(): void {
    this.setting.lang$.subscribe(data => {
      this.setting.GetLangText().subscribe(data => {
        this.data = data;
      });
    })
  }


  changesLang(lang: LangEnum) {
    this.setting.setLang(lang);
    this.lang = lang;
  }



}
