import { Message } from './../../models/Message.model';
import { Component } from '@angular/core';
import { Lang, SettingService } from '../../services/setting.service';
import { ContactMeData } from '../../models/lang/contact-me.model';
import { ApiService } from '../../services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-form-contact-me',
    templateUrl: './form-contact-me.component.html',
    styleUrls: ['./form-contact-me.component.scss'],
    standalone: false
})
export class FormContactMeComponent {
  // @ts-ignore
  messageForm: FormGroup;

  constructor(
    private setting: SettingService,
    private apiService: ApiService
  ) {}

  message: Message = new Message();
  name: String = '';
  data: ContactMeData | null = null;
  enable: boolean = true;
  lang:String = Lang.es;
  messageReponse = {
    code: 200,
    message: '',
  };

  ngOnInit(): void {
    this.messageForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(250),
      ]),
      subject: new FormControl('', [
        Validators.required,
        Validators.maxLength(250),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(250),
      ]),
      message: new FormControl('', [Validators.required]),
    });

    this.setting.lang$.subscribe((d) => {
      this.data = this.setting.data.contact_me;
      this.lang = d;
    });
  }

  onSubmit() {
    this.enable = false;
    if (!this.messageForm.valid) {
      return;
    }
    this.message = {
      name: this.messageForm.value.name,
      subject: this.messageForm.value.subject,
      email: this.messageForm.value.email,
      message: this.messageForm.value.message
    };

    this.apiService.sendMessage(this.message).subscribe({
      next: (d) => {

        if (d.status == 200) {
            this.messageForm.reset();
          this.messageReponse.code = 200;
          this.messageReponse.message =
            'Se ha enviado correctamente el mensaje';
        } else {
          this.messageReponse.code = 400;
          this.messageReponse.message = 'Error al enviar el correo';
        }
        this.enable = true;
        let mensaje = this.messageReponse.message;
        let count = 0;
        this.messageReponse.message = mensaje + ' ' + (10 - count) + ' seg';
        count++;
        let time = setInterval(() => {
          if (this.messageReponse.message == '') {
            clearInterval(time);
            return;
          }
          this.messageReponse.message = mensaje + ' ' + (10 - count) + ' seg';
          count++;
          if (count == 11) {
            clearInterval(time);
            this.messageReponse.message = '';
          }
        }, 1000);
      },
      error: (error) => {
        console.error('Error al enviar el mensaje:', error);
        this.messageReponse.code = 400;
        this.messageReponse.message = 'Error al intentar consumir el API';
        this.enable = true;
        let mensaje = this.messageReponse.message;
        let count = 0;
        this.messageReponse.message = mensaje + ' ' + (10 - count) + ' seg';
        count++;
        let time = setInterval(() => {
          if (this.messageReponse.message == '') {
            clearInterval(time);
            return;
          }
          this.messageReponse.message = mensaje + ' ' + (10 - count) + ' seg';
          count++;
          if (count == 11) {
            clearInterval(time);
            this.messageReponse.message = '';
          }
        }, 1000);
      },
    });
  }

  Close() {
    this.messageReponse.message = '';
  }
}
