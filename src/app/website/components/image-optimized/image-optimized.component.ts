import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-optimized',
  templateUrl: './image-optimized.component.html',
  styleUrl: './image-optimized.component.scss',
  standalone: false
})
export class ImageOptimizedComponent {
  @Input() class2: string = "";
  @Input() srcImg: string = "";
  @Input() srcImgMobile: string = "";
  @Input() textAlt: string = "undefined";
  @Input() activeFilter: boolean = false;

  srcImgDefault: string = "/assets/img/Icons/logo.svg";

  setImgDefault() {
    this.srcImg = this.srcImgDefault;
  }
}
