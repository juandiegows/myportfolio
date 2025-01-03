import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-levitate-icon',
    templateUrl: './levitate-icon.component.html',
    styleUrls: ['./levitate-icon.component.scss'],
    standalone: false
})
export class LevitateIconComponent {
  @Input() srcImg: string  = "";
  @Input() textAlt: string = "undefined";
}
