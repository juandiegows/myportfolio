import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-optimized',
  templateUrl: './image-optimized.component.html',
  styleUrl: './image-optimized.component.scss',
  standalone: false
})
export class ImageOptimizedComponent {
  @Input() class2: String = "";
  @Input() srcImg: String = "";
  @Input() srcImgMobile: String = "";
  @Input() textAlt: String = "undefined";
  @Input() activeFilter: boolean = false;

  srcImgDefault: string = "/assets/img/Icons/logo.svg";

  setImgDefault() {
    this.srcImg = this.srcImgDefault;
  }
}
