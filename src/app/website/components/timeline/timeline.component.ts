import { AfterViewInit, Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Event } from '../../models/Event.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { EventInfo } from '../../models/info/EventInfo.model';
import { Lang, SettingService } from '../../services/setting.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  standalone: false,
})
export class TimelineComponent implements AfterViewInit {
  eventsMinDistance: number = 120;

  selected: number = 1;
  first: number = 1;
  itemSelect: any = {};
  safeUrl: SafeResourceUrl | null = null; // URL segura para iframe

  events: EventInfo[] = [];
  eventsAll: Event[] = [];
  constructor(
    private readonly apiService: ApiService,
    private readonly sanitizer: DomSanitizer,
    private readonly setting: SettingService
  ) {}

  ngOnInit(): void {
    this.setting.lang$.subscribe(() => {
      this.fillEvents();
    });
    this.apiService.getEvents().subscribe({
      next: (data) => {
        this.eventsAll = data.data as Event[];
        this.fillEvents();
        this.itemSelect = this.events.find((event) => event.is_initial);
        this.first = this.itemSelect.id || this.events[0].id;
        this.selected = this.itemSelect.id;
        this.selectItem(this.itemSelect.id);
      },
      error: (err) => {
        console.error('Error al cargar eventos:', err);
      },
    });

    this.setDisabledPrev();
    const events = document.querySelector('.events-wrapper') as HTMLElement;
    events.addEventListener('scroll', () => {
      this.setDisabledPrev();
      this.setDisabledNext();
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const events = document.querySelector('.events-wrapper') as HTMLElement;
      const index = this.events.findIndex((item) => item.id === this.selected);
      let scrollDistance = index * 100;

      events.scrollTo({
        left: scrollDistance,
        behavior: 'smooth',
      });

      const eventElement = document.getElementById(`event_${this.selected}`);
      if (eventElement) {
        const eventsContent = document.querySelector(
          `.events-content`
        ) as HTMLElement;
        const ancho_eventElement = eventElement.clientWidth; // Obtener el ancho del elemento
        const scrollDistance = index * ancho_eventElement;

        eventsContent.scrollTo({
          left: scrollDistance,
          behavior: 'smooth', // Desplazamiento suave
        });
      }
    }, 3000);
  }

  fillEvents() {
    this.events = this.eventsAll.map((event) => ({
      id: event.id,
      user_id: event.user_id,
      date: event.date,
      title: this.setting.lang === Lang.en ? event.title : event.spanish_title,
      description:
        this.setting.lang === Lang.en
          ? event.description
          : event.spanish_description,
      url: event.url,
      type: event.type,
      is_initial: event.is_initial,
      created_at: event.created_at,
      updated_at: event.updated_at,
      url_full: event.url_full,
    }));

    this.itemSelect = this.events.find((event) => event.is_initial);
    this.first = this.itemSelect?.id || this.events[0]?.id;
    this.selected = this.itemSelect?.id;
    this.selectItem(this.itemSelect?.id);
  }

  selectItem(id: number): void {
    this.selected = id;
    this.itemSelect = this.events.find((item) => item.id === id);

    // Sanitizar URL si es de YouTube
    if (this.isYoutube(this.itemSelect.type)) {
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.itemSelect.url
      );
    }

    const events = document.querySelector('.events-wrapper') as HTMLElement;

    if (events) {
      const index = this.events.findIndex((item) => item.id === id);
      const scrollDistance = index * 100;

      events.scrollTo({
        left: scrollDistance,
        behavior: 'smooth',
      });

      const eventElement = document.getElementById(`event_${id}`);
      if (eventElement) {
        eventElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    }
  }

  calculateEventsWidth(): string {
    const eventsWrapper = document.querySelector(
      '.events-wrapper'
    ) as HTMLElement;

    if (!eventsWrapper) {
      return '0px'; // Si no se encuentra el contenedor, devolver un ancho predeterminado.
    }

    // Calcula el ancho basado en la distancia mínima y la cantidad de elementos.
    const calculatedWidth =
      this.eventsMinDistance * (this.events.length + 1) + 100;

    // Obtén el ancho del contenedor `.events-wrapper`.
    const wrapperWidth = eventsWrapper.offsetWidth;

    // Devuelve el mayor entre el ancho calculado y el ancho del contenedor.
    return `${Math.max(calculatedWidth, wrapperWidth)}px`;
  }

  setDisabledPrev() {
    const events = document.querySelector('.events-wrapper') as HTMLElement;
    const prevButton = document.getElementById('prev');
    if (events && prevButton) {
      // Verifica si el scroll horizontal está en la posición inicial

      if (events.scrollLeft === 0) {
        // Agrega la clase 'inactive' para desactivar el botón
        prevButton.classList.add('inactive');
      } else {
        // Quita la clase 'inactive' para activar el botón
        prevButton.classList.remove('inactive');
      }
    }
  }

  setDisabledNext() {
    const events = document.querySelector('.events-wrapper') as HTMLElement;
    const nextButton = document.getElementById('next');

    if (events && nextButton) {
      // Verifica si el scroll está al máximo
      if (events.scrollLeft + events.clientWidth >= events.scrollWidth - 50) {
        nextButton.classList.add('inactive'); // Desactivar
      } else {
        nextButton.classList.remove('inactive'); // Activar
      }
    }
  }

  prev(): void {
    const events = document.querySelector('.events-wrapper') as HTMLElement;

    if (events) {
      const containerWidth = events.offsetWidth * -1;
      events.scrollTo({
        left: containerWidth,
        behavior: 'smooth', // Desplazamiento suave
      });
    }
  }

  next(): void {
    const events = document.querySelector('.events-wrapper') as HTMLElement;

    if (events) {
      const containerWidth = events.offsetWidth;
      const maxScrollLeft = events.scrollWidth - containerWidth; // Límite máximo del desplazamiento

      // Calcula el nuevo valor para scrollLeft
      const newScrollLeft = Math.min(
        events.scrollLeft + containerWidth,
        maxScrollLeft
      );

      events.scrollTo({
        left: newScrollLeft, // Ajusta al límite si es necesario
        behavior: 'smooth', // Desplazamiento suave
      });
    }
  }

  isImage(type: string): boolean {
    return type === 'image';
  }

  isVideo(type: string): boolean {
    return type === 'video';
  }

  isWeb(type: string): boolean {
    return type === 'web';
  }

  isText(type: string): boolean {
    return type === 'text';
  }

  isYoutube(type: string): boolean {
    return type === 'youtube';
  }
}
