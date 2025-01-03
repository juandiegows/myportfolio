import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Lang, SettingService } from '../../services/setting.service';

@Component({
    selector: 'app-alert-info',
    templateUrl: './alert-info.component.html',
    styleUrls: ['./alert-info.component.scss'],
    standalone: false
})
export class AlertInfoComponent implements OnInit {
  @Input()
  active: Boolean = true;

  @Output()
  IsActive = new EventEmitter<Boolean>();
  @Input()
  img: String = "";
  @Input()
  title: String = "sin titulo";
  @Input()
  texto: String = "";

  @Input()
  textBtnProject: String = ""
  @Input()
  textBtnExperience: String = ""
  Close() {
    this.active = false;
    this.IsActive.emit(false);
  }
  message_active = false;
  constructor(private setting: SettingService) {

  }
  message = "doble clic afuera para cerrar"
  ngOnInit(): void {
    this.setting.lang$.subscribe(data => {
      if(data == Lang.es){
        this.message = "doble clic afuera para cerrar"
      }else {
        this.message = "double click outside to close"
      }
    })
  }

}
