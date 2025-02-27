import { Message } from './../../models/Message.model';
import { Component, Inject } from '@angular/core';
import { Lang, SettingService } from '../../services/setting.service';
import { ContactMeData } from '../../models/lang/contact-me.model';
import { ApiService } from '../../services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
@Component({
  selector: 'app-form-contact-me',
  templateUrl: './form-contact-me.component.html',
  styleUrls: ['./form-contact-me.component.scss'],
  standalone: false,
})
export class FormContactMeComponent {
  // @ts-ignore
  messageForm: FormGroup;
  captchaValid: boolean = false;
  constructor(
    private readonly setting: SettingService,
    private readonly apiService: ApiService,
    private readonly recaptchaV3Service: ReCaptchaV3Service,
    @Inject(RECAPTCHA_V3_SITE_KEY) private readonly siteKey: string
  ) {}

  message: Message = new Message();
  name: string = '';
  data: ContactMeData | null = null;
  enable: boolean = true;
  lang: string = Lang.es;
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

    // Validar si el formulario es válido antes de ejecutar el reCAPTCHA
    if (!this.messageForm.valid) {
        console.warn('El formulario no es válido.');
        this.mostrarMensaje('Por favor, complete todos los campos del formulario.', 10);
        this.enable = true;
        return;
    }

    // Ejecutar reCAPTCHA solo si el formulario es válido
    this.recaptchaV3Service.execute('submit').subscribe({
        next: (token: string) => {
            this.enviarMensaje(token); // Enviar el mensaje con el token del reCAPTCHA
        },
        error: (error) => {
            console.error('Error al generar el token de reCAPTCHA:', error);
            this.mostrarMensaje('No se ha validado el reCAPTCHA.', 10);
            this.enable = true;
        }
    });
}

// Método para enviar el mensaje directamente con el token de reCAPTCHA
private enviarMensaje(token: string) {
    this.message = {
        name: this.messageForm.value.name,
        subject: this.messageForm.value.subject,
        email: this.messageForm.value.email,
        message: this.messageForm.value.message,
        captcha_token: token // Enviar el token a la API
    };

    this.apiService.sendMessage(this.message).subscribe({
        next: (d) => {
            if (d.status === 200) {
                this.messageForm.reset();
                this.mostrarMensaje('Se ha enviado correctamente el mensaje', 10, 200);
            } else {
                this.mostrarMensaje('Error al enviar el correo', 10, 400);
            }
            this.enable = true;
        },
        error: (error) => {
            // Mostrar los errores específicos del formulario
            if (error?.error?.errors) {
              const errors = error.error.errors;
              const errorMessages = Object.keys(errors)
                  .map((key) => `${key}: ${errors[key].join(', ')}`)
                  .join('\n');
  
              this.mostrarMensaje(errorMessages, 10, 400);
          } else {
              this.mostrarMensaje('Error al intentar consumir el API', 10, 400);
          }
    
            this.enable = true;
        }
    });
}

// Método reutilizable para mostrar mensajes con temporizador
private mostrarMensaje(mensaje: string, segundos: number, codigo: number = 400) {
    this.messageReponse.code = codigo;
    let count = 0;
    this.messageReponse.message = `${mensaje} ${segundos - count} seg`;
    count++;

    const time = setInterval(() => {
        if (count > segundos) {
            clearInterval(time);
            this.messageReponse.message = '';
            return;
        }
        this.messageReponse.message = `${mensaje} ${segundos - count} seg`;
        count++;
    }, 1000);
}

  Close() {
    this.messageReponse.message = '';
  }
}
