import { Message } from './../../models/Message.model';
import { Component } from '@angular/core';
import { SettingService } from '../../services/setting.service';
import { ContactMeData } from '../../models/lang/contact-me.model';
import { ApiService } from '../../services/api.service';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-form-contact-me',
  templateUrl: './form-contact-me.component.html',
  styleUrls: ['./form-contact-me.component.scss'],
})
export class FormContactMeComponent {
  constructor(
    private setting: SettingService,
    private apiService: ApiService
  ) {}

  message: Message = new Message();
  name: String = '';
  data: ContactMeData | null = null;
  enable : boolean = true;
  messageReponse = {
    code: 200,
    message: '',
  };

  ngOnInit(): void {
    this.setting.lang$.subscribe((d) => {
      this.data = this.setting.data.contact_me;
    });
  }

  onSubmit() {
    this.enable = false;
    this.apiService.sendMessage(this.message).subscribe({
      next:d=> {


        if (d.status == 200) {
          this.messageReponse.code = 200;
          this.messageReponse.message =
            'Se ha enviado correctamente el mensaje';

            this.message = new Message();
        } else {
          this.messageReponse.code = 400;
          this.messageReponse.message = 'Error al enviar el correo';
        }
        this.enable = true;
        let mensaje =  this.messageReponse.message;
        let count = 0;
        this.messageReponse.message = mensaje +" "+ (10 - count) +" seg";
        count++;
        let time=  setInterval(() =>{
          if( this.messageReponse.message == ""){
            clearInterval(time);
            return;
          }
          this.messageReponse.message = mensaje +" "+ (10 - count) +" seg";
          count++;
          if(count == 11){
            clearInterval(time);
            this.messageReponse.message = "";
          }
        }, 1000);
      },
      error: (error) => {
        console.error('Error al enviar el mensaje:', error);
        this.messageReponse.code = 400;
        this.messageReponse.message = 'Error al intentar consumir el API';
        this.enable = true;
        let mensaje =  this.messageReponse.message;
        let count = 0;
        this.messageReponse.message = mensaje +" "+ (10 - count) +" seg";
        count++;
        let time=  setInterval(() =>{
          if( this.messageReponse.message == ""){
            clearInterval(time);
            return;
          }
          this.messageReponse.message = mensaje +" "+ (10 - count) +" seg";
          count++;
          if(count == 11){
            clearInterval(time);
            this.messageReponse.message = "";
          }
        }, 1000);
      },
    });
  }

  Close(){
    this.messageReponse.message = "";
  }
}
