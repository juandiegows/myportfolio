import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {
  @Input() class2: String = "";
  @Input() srcImg: String = "";
  @Input() srcImgMobile: String = "";
  srcImgDefault: String = "/assets/img/Icons/logo.svg";
  @Input() textAlt: String = "undefined";

  @Input()
  activeFilter: boolean = false;
  setImgDefault() {
    this.srcImg = this.srcImgDefault;
  }
}
