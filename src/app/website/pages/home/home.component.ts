import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false
})
export class HomeComponent implements OnInit {
  constructor(private route: ActivatedRoute) {

  }
  id: String | null = "nada"
  ngOnInit(): void {
    this.route.paramMap.subscribe(data => {
      this.id = data.get('id');
      if (this.id)
        setTimeout(() => {
          const element: HTMLElement = document.getElementById(this.id as string) as HTMLElement;

          const rect = element.getBoundingClientRect();
          const topOffset = window.pageYOffset + rect.top - 5 * parseFloat(getComputedStyle(document.documentElement).fontSize);
          window.scrollTo({ top: topOffset, behavior: 'smooth' });
        }, 200);

    })
  }
}
