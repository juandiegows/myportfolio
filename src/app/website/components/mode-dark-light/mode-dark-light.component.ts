import { Component } from '@angular/core';
import { Mode, SettingService } from '../../services/setting.service';

@Component({
  selector: 'app-mode-dark-light',
  templateUrl: './mode-dark-light.component.html',
  styleUrls: ['./mode-dark-light.component.scss']
})
export class ModeDarkLightComponent {
  modeDark: Boolean = true;
  constructor(private setting: SettingService) {

  }
  ChangesMode() {
    this.modeDark = !this.modeDark;
    const root = document.documentElement;
    const style = getComputedStyle(root);
    if (this.modeDark) {
      root.style.setProperty('--background', style.getPropertyValue('--DarkBackgoundColor'));
      root.style.setProperty('--color', style.getPropertyValue('--DarkColor'));
      root.style.setProperty('--backgroundSecond', style.getPropertyValue('--DarkSecondBackgoundColor'));
      this.setting.setMode(Mode.dark);
    } else {
      root.style.setProperty('--background', style.getPropertyValue('--LightBackgroudColor'));
      root.style.setProperty('--color', style.getPropertyValue('--LightColor'));
      root.style.setProperty('--backgroundSecond', style.getPropertyValue('--LightSecondBackgoundColor'));
      this.setting.setMode(Mode.light);
    }

  }
}
