import { Component } from '@angular/core';

@Component({
    selector: 'app-carousel-image',
    templateUrl: './carousel-image.component.html',
    styleUrls: ['./carousel-image.component.scss'],
    standalone: false
})
export class CarouselImageComponent {
  index_active = 4;
}
