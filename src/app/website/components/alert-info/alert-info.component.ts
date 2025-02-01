import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Lang, SettingService } from '../../services/setting.service';
import { Topic } from '../../models/Topic.model';
import { TopicInfo } from '../../models/info/TopicInfo.model';

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
  @Output() onExperienceClick = new EventEmitter<TopicInfo>();

  @Input()
  skill: TopicInfo  | null = null;

  @Input()
  textBtnProject: string = ""
  @Input()
  textBtnExperience: string = ""


  Close() {
    this.active = false;
    this.IsActive.emit(false);
  }


  onExperience() {
    if(this.skill == null) return;
    this.Close();
    this.onExperienceClick.emit(this.skill);
  }

  message_active = false;
  constructor(private  readonly setting: SettingService) {

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
