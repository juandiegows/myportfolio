import { Component } from '@angular/core';
import { SettingService } from '../../services/setting.service';
import { ContactMeData } from '../../models/lang/contact-me.model';

@Component({
  selector: 'app-form-contact-me',
  templateUrl: './form-contact-me.component.html',
  styleUrls: ['./form-contact-me.component.scss']
})
export class FormContactMeComponent {
  constructor(private setting: SettingService) {

  }
  data: ContactMeData | null = null

  ngOnInit(): void {
    this.setting.lang$.subscribe(d => {
      this.data = this.setting.data.contact_me;
    })
  }

}
