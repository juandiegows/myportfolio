import { Component } from '@angular/core';
import { ColorFilterService } from '../../services/color-filter.service';

@Component({
  selector: 'app-pallette',
  templateUrl: './pallette.component.html',
  styleUrls: ['./pallette.component.scss']
})
export class PalletteComponent {
  active: Boolean = false;
  constructor(private colorF: ColorFilterService) {

  }

  changeColor(elementMouse: MouseEvent) {
    const root = document.documentElement;
    const element = elementMouse.target as HTMLElement;

    const divStyle = window.getComputedStyle(element);
    const backgroundColor = divStyle.getPropertyValue('background-color');
    const rgbValues = backgroundColor.substring(4, backgroundColor.length - 1)
      .replace(/ /g, '')
      .split(',');
    const red = parseInt(rgbValues[0]);
    const green = parseInt(rgbValues[1]);
    const blue = parseInt(rgbValues[2]);
    this.colorF.set(red, green, blue);
    root.style.setProperty('--colorPrimary', backgroundColor);
    const result = this.colorF.solve();
    root.style.setProperty('--colorPrimaryF', result.filter);
    this.active = false;
  }
}
