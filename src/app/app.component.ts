import { Component } from '@angular/core';
import { SettingService } from './website/services/setting.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Mi portafolio';
  constructor(private settingService: SettingService) {}

  ngOnInit(): void {
     this.settingService.init();
  }
}
