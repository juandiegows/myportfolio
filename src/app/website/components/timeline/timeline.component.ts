import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  animations: [
    trigger('slideAnimation', [
      // Animación de entrada
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate(
          '300ms ease-out',
          style({ transform: 'translateX(0)', opacity: 1 })
        ),
      ]),
      // Animación de salida
      transition(':leave', [
        animate(
          '300ms ease-in',
          style({ transform: 'translateX(100%)', opacity: 0 })
        ),
      ]),
    ]),
  ],
  standalone: false,
})
export class TimelineComponent {
  eventsMinDistance: number = 120;

  selected: number = 1; // Aquí defines el id seleccionado
  first: number = 1;
  itemSelect: any = {};

  items = [
    {
      id: 1,
      date: '16/01/2014',
      title: 'Horizontal Timeline',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum praesentium officia, fugit recusandae ipsa, quia velit nulla adipisci? Consequuntur aspernatur at, eaque hic repellendus sit dicta consequatur quae, ut harum ipsam molestias maxime non nisi reiciendis eligendi!',
      url: 'https://juandiegows.com/assets/video/HV%20Juan%20Diego%20Mej%C3%ADa.mp4',
      type: 'video', // Especificar el tipo
      IsInitial: true,
    },
    {
      id: 2,
      date: '28/02/2014',
      title: 'Event title here',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum praesentium officia, fugit recusandae ipsa, quia velit nulla adipisci? Consequuntur aspernatur at, eaque hic repellendus sit dicta consequatur quae, ut harum ipsam molestias maxime non nisi reiciendis eligendi!',
      url: 'https://radionacional-v3.s3.amazonaws.com/s3fs-public/styles/portadas_relaciona_4_3/public/node/article/field_image/image_50407425.JPG',
      type: 'image', // Especificar el tipo
      IsInitial: false,
    },
    {
      id: 3,
      date: '20/04/2014',
      title: 'Event title here',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum praesentium officia, fugit recusandae ipsa, quia velit nulla adipisci? Consequuntur aspernatur at, eaque hic repellendus sit dicta consequatur quae, ut harum ipsam molestias maxime non nisi reiciendis eligendi!',
      url: 'https://www.radionacional.co/actualidad/personajes/joven-de-la-guajira-gano-medalla-la-excelencia-worldskills-special-edition',
      type: 'web', // Especificar el tipo
      IsInitial: false,
    },
    {
      id: 4,
      date: '16/01/2014',
      title: 'Horizontal Timeline',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum praesentium officia, fugit recusandae ipsa, quia velit nulla adipisci? Consequuntur aspernatur at, eaque hic repellendus sit dicta consequatur quae, ut harum ipsam molestias maxime non nisi reiciendis eligendi!',
      url: 'https://juandiegows.com/assets/video/HV%20Juan%20Diego%20Mej%C3%ADa.mp4',
      type: 'video', // Especificar el tipo
      IsInitial: true,
    },
    {
      id: 5,
      date: '28/02/2014',
      title: 'Event title here',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum praesentium officia, fugit recusandae ipsa, quia velit nulla adipisci? Consequuntur aspernatur at, eaque hic repellendus sit dicta consequatur quae, ut harum ipsam molestias maxime non nisi reiciendis eligendi!',
      url: 'https://radionacional-v3.s3.amazonaws.com/s3fs-public/styles/portadas_relaciona_4_3/public/node/article/field_image/image_50407425.JPG',
      type: 'image', // Especificar el tipo
      IsInitial: false,
    },
    {
      id: 6,
      date: '20/04/2014',
      title: 'Event title here',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum praesentium officia, fugit recusandae ipsa, quia velit nulla adipisci? Consequuntur aspernatur at, eaque hic repellendus sit dicta consequatur quae, ut harum ipsam molestias maxime non nisi reiciendis eligendi!',
      url: 'https://www.radionacional.co/actualidad/personajes/joven-de-la-guajira-gano-medalla-la-excelencia-worldskills-special-edition',
      type: 'web', // Especificar el tipo
      IsInitial: false,
    },
  ];

  ngOnInit(): void {
    this.itemSelect = this.items.find((item) => item.id === this.selected);
    this.first = this.itemSelect.id || this.items[0].id;
    this.setDisabledPrev();
    const events = document.querySelector('.events-wrapper') as HTMLElement;
    events.addEventListener('scroll', () => {
      this.setDisabledPrev();
      this.setDisabledNext();
    });
  }

  selectItem(id: number, index: number): void {
    this.selected = id; // Actualiza la variable seleccionada con el ID del elemento
    this.itemSelect = this.items.find((item) => item.id === id);
    const events = document.querySelector('.events-wrapper') as HTMLElement;

    if (events) {
      const scrollDistance = index * 100;

      events.scrollTo({
        left: scrollDistance,
        behavior: 'smooth',
      });
      // Selecciona el elemento con el id dinámico
      const eventElement = document.getElementById(`event_${id}`);

      if (eventElement) {
        // Desplázate suavemente hacia el evento seleccionado
        eventElement.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
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
      this.eventsMinDistance * (this.items.length + 1) + 100;

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
}
