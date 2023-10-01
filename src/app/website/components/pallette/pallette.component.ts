import { Component } from '@angular/core';
import { ColorFilterService } from '../../services/color-filter.service';
import { SettingService } from '../../services/setting.service';

@Component({
  selector: 'app-pallette',
  templateUrl: './pallette.component.html',
  styleUrls: ['./pallette.component.scss']
})
export class PalletteComponent {
  active: boolean = false;
  constructor(private colorF: ColorFilterService, private setting: SettingService) { }

  changeColor(elementMouse: MouseEvent) {
    const element = elementMouse.target as HTMLElement;
    const divStyle = window.getComputedStyle(element);
    const backgroundColor = divStyle.getPropertyValue('background-color');
    this.setting.changeColor(backgroundColor);
    this.active = false;
  }
}
