import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../services/setting.service';
import { Project } from '../../models/lang/project.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  constructor(private setting: SettingService) {

  }
  data: Project | null = null

  ngOnInit(): void {
    this.setting.lang$.subscribe(d => {
      this.data = this.setting.data.project;
    })
  }

}
