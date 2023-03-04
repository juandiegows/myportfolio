import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert-info',
  templateUrl: './alert-info.component.html',
  styleUrls: ['./alert-info.component.scss']
})
export class AlertInfoComponent {
  @Input()
  active: Boolean = true;

  @Output()
  IsActive = new EventEmitter<Boolean>();
  @Input()
  img : String = "";
  @Input()
  title : String = "sin titulo";
  @Input()
  texto : String = "";
  Close(){
    this.active = false;
    this.IsActive.emit(false);
  }
}
