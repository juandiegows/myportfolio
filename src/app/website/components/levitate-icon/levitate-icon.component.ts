import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-levitate-icon',
  templateUrl: './levitate-icon.component.html',
  styleUrls: ['./levitate-icon.component.scss']
})
export class LevitateIconComponent {
  @Input() srcImg: String  = "";
  @Input() textAlt:String = "undefined";
}
