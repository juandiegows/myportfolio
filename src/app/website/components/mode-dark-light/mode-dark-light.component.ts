import { Component } from '@angular/core';
import { Mode, SettingService } from '../../services/setting.service';

@Component({
  selector: 'app-mode-dark-light',
  templateUrl: './mode-dark-light.component.html',
  styleUrls: ['./mode-dark-light.component.scss']
})
export class ModeDarkLightComponent {
  modeDark: boolean = true;
  constructor(private setting: SettingService) {

  }
  ChangesMode() {
    this.modeDark = !this.modeDark;
    this.setting.setMode(this.modeDark ? Mode.dark : Mode.light);
  }
}
