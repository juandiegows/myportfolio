import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-up-buttom',
  templateUrl: './up-buttom.component.html',
  styleUrls: ['./up-buttom.component.scss']
})
export class UpButtomComponent implements OnInit {

  visible = false;

  ngOnInit(): void {
    window.onscroll = () => {
      this.toggleScrollUpButton();
    };
  }

  toggleScrollUpButton() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      if (!this.visible)
        this.visible = true;
    } else {
      if (this.visible)
        this.visible = false;
    }
  }

  up() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }
}
