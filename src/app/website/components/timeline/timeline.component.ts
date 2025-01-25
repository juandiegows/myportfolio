import { Component, AfterViewInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  standalone: false,
})
export class TimelineComponent {
  eventsMinDistance: number = 120;

  selected: number = 1; // Aquí defines el id seleccionado
  first: number = 1;
  items = [
    {
      id: 1,
      date: '16/01/2014',
      title: 'Horizontal Timeline',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum praesentium officia, fugit recusandae ipsa, quia velit nulla adipisci? Consequuntur aspernatur at, eaque hic repellendus sit dicta consequatur quae, ut harum ipsam molestias maxime non nisi reiciendis eligendi!',
    },
    {
      id: 2,
      date: '28/02/2014',
      title: 'Event title here',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum praesentium officia, fugit recusandae ipsa, quia velit nulla adipisci?',
    },
    {
      id: 3,
      date: '20/04/2014',
      title: 'Event title here',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum praesentium officia, fugit recusandae ipsa, quia velit nulla adipisci?',
    },
    {
      id: 4,
      date: '20/05/2014',
      title: 'Event title here',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum praesentium officia, fugit recusandae ipsa, quia velit nulla adipisci?',
    },
    {
      id: 5,
      date: '09/07/2014',
      title: 'Event title here',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum praesentium officia, fugit recusandae ipsa, quia velit nulla adipisci?',
    },
    {
      id: 6,
      date: '30/08/2014',
      title: 'Event title here',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum praesentium officia, fugit recusandae ipsa, quia velit nulla adipisci?',
    },
    {
      id: 7,
      date: '15/09/2014',
      title: 'Event title here',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum praesentium officia, fugit recusandae ipsa, quia velit nulla adipisci?',
    },
    {
      id: 8,
      date: '01/11/2014',
      title: 'Event title here',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum praesentium officia, fugit recusandae ipsa, quia velit nulla adipisci?',
    },
    {
      id: 9,
      date: '10/12/2014',
      title: 'Event title here',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum praesentium officia, fugit recusandae ipsa, quia velit nulla adipisci?',
    },
    {
      id: 10,
      date: '19/01/2015',
      title: 'Event title here',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum praesentium officia, fugit recusandae ipsa, quia velit nulla adipisci?',
    },
    {
      id: 11,
      date: '03/03/2015',
      title: 'Event title here',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum praesentium officia, fugit recusandae ipsa, quia velit nulla adipisci?',
    },
  ];

  ngOnInit(): void {
    this.first = this.items[0].id;
    this.setDisabledPrev();
    const events = document.querySelector('.events-wrapper') as HTMLElement;
    events.addEventListener('scroll', () => {
      this.setDisabledPrev();
      this.setDisabledNext();
    });
  }

  selectItem(id: number, index: number): void {
    this.selected = id; // Actualiza la variable seleccionada con el ID del elemento

    const events = document.querySelector('.events-wrapper') as HTMLElement;

    if (events) {
      // Calcula la distancia de desplazamiento con base en el índice
      const scrollDistance = index * 100; // 100 puede ser reemplazado por tu distancia mínima entre elementos (eventsMinDistance)

      events.scrollTo({
        left: scrollDistance, // Desplaza horizontalmente en función del índice
        behavior: 'smooth', // Desplazamiento suave
      });
    }
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

  private initTimeline(timeline: HTMLElement): void {
    const timelineComponents = {
      timelineWrapper: timeline.querySelector('.events-wrapper') as HTMLElement,
      eventsWrapper: timeline.querySelector(
        '.events-wrapper .events'
      ) as HTMLElement,
      fillingLine: timeline.querySelector(
        '.events-wrapper .events .filling-line'
      ) as HTMLElement,
      timelineEvents: Array.from(
        timeline.querySelectorAll('.events-wrapper .events a')
      ) as HTMLElement[],
      timelineNavigation: timeline.querySelector(
        '.cd-timeline-navigation'
      ) as HTMLElement,
      eventsContent: timeline.querySelector('.events-content') as HTMLElement,
    };

    const timelineDates = this.parseDate(timelineComponents.timelineEvents);
    const eventsMinLapse = this.minLapse(timelineDates);

    this.setDatePosition(timelineComponents, timelineDates, eventsMinLapse);
    const timelineTotWidth = this.setTimelineWidth(
      timelineComponents,
      eventsMinLapse
    );

    timeline.classList.add('loaded');

    timelineComponents.timelineNavigation
      .querySelector('.next')
      ?.addEventListener('click', (event) => {
        event.preventDefault();
        this.updateSlide(timelineComponents, timelineTotWidth, 'next');
      });

    timelineComponents.timelineNavigation
      .querySelector('.prev')
      ?.addEventListener('click', (event) => {
        event.preventDefault();
        this.updateSlide(timelineComponents, timelineTotWidth, 'prev');
      });

    timelineComponents.eventsWrapper.addEventListener(
      'click',
      (event: Event) => {
        alert('hola');
        const target = event.target as HTMLElement;
        if (target.tagName === 'A') {
          event.preventDefault();
          timelineComponents.timelineEvents.forEach((e) =>
            e.classList.remove('selected')
          );
          target.classList.add('selected');
          this.updateOlderEvents(target);
          this.updateFilling(
            target,
            timelineComponents.fillingLine,
            timelineTotWidth
          );
          this.updateVisibleContent(target, timelineComponents.eventsContent);
        }
      }
    );
  }

  private updateSlide(
    timelineComponents: any,
    timelineTotWidth: number,
    direction: 'next' | 'prev'
  ): void {
    const translateValue = this.getTranslateValue(
      timelineComponents.eventsWrapper
    );
    const wrapperWidth = timelineComponents.timelineWrapper.offsetWidth;

    if (direction === 'next') {
      this.translateTimeline(
        timelineComponents,
        translateValue - wrapperWidth + this.eventsMinDistance,
        wrapperWidth - timelineTotWidth
      );
    } else {
      this.translateTimeline(
        timelineComponents,
        translateValue + wrapperWidth - this.eventsMinDistance
      );
    }
  }

  private translateTimeline(
    timelineComponents: any,
    value: number,
    totWidth?: number
  ): void {
    const eventsWrapper = timelineComponents.eventsWrapper as HTMLElement;
    value = Math.max(value, totWidth || -Infinity);
    value = Math.min(value, 0);

    this.setTransformValue(eventsWrapper, 'translateX', `${value}px`);

    const prevArrow = timelineComponents.timelineNavigation.querySelector(
      '.prev'
    ) as HTMLElement;
    const nextArrow = timelineComponents.timelineNavigation.querySelector(
      '.next'
    ) as HTMLElement;

    if (value === 0) prevArrow.classList.add('inactive');
    else prevArrow.classList.remove('inactive');

    if (value === totWidth) nextArrow.classList.add('inactive');
    else nextArrow.classList.remove('inactive');
  }

  private setTransformValue(
    element: HTMLElement,
    property: string,
    value: string
  ): void {
    element.style.transform = `${property}(${value})`;
  }

  private parseDate(events: HTMLElement[]): Date[] {
    return events.map((event) => {
      const dateValue = event.dataset['date'];
      if (!dateValue) {
        throw new Error('Date attribute is missing in dataset');
      }
      const dateComponents = dateValue.split('/');
      return new Date(
        +dateComponents[2],
        +dateComponents[1] - 1,
        +dateComponents[0]
      );
    });
  }

  private setDatePosition(
    timelineComponents: any,
    timelineDates: Date[],
    minLapse: number
  ): void {
    timelineComponents.timelineEvents.forEach(
      (event: HTMLElement, index: number) => {
        const distance = this.daydiff(timelineDates[0], timelineDates[index]);
        const distanceNorm = Math.round(distance / minLapse) + 2;
        event.style.left = `${distanceNorm * this.eventsMinDistance}px`;
      }
    );
  }

  private setTimelineWidth(timelineComponents: any, minLapse: number): number {
    const timeSpan = this.daydiff(
      timelineComponents.timelineDates[0],
      timelineComponents.timelineDates[
        timelineComponents.timelineDates.length - 1
      ]
    );
    const timeSpanNorm = Math.round(timeSpan / minLapse) + 4;
    const totalWidth = timeSpanNorm * this.eventsMinDistance;

    timelineComponents.eventsWrapper.style.width = `${totalWidth}px`;
    this.updateFilling(
      timelineComponents.timelineEvents[0],
      timelineComponents.fillingLine,
      totalWidth
    );

    return totalWidth;
  }

  private daydiff(first: Date, second: Date): number {
    return Math.round((+second - +first) / (1000 * 60 * 60 * 24));
  }

  private minLapse(dates: Date[]): number {
    if (dates.length < 2) return 0;
    const lapses = dates
      .slice(1)
      .map((date, i) => this.daydiff(dates[i], date));
    return Math.min(...lapses);
  }

  private updateOlderEvents(event: HTMLElement): void {
    const li = event.parentElement as HTMLElement;
    const prevEvents = Array.from(
      li.previousElementSibling?.children || []
    ) as HTMLElement[];
    const nextEvents = Array.from(
      li.nextElementSibling?.children || []
    ) as HTMLElement[];

    prevEvents.forEach((e) => e.classList.add('older-event'));
    nextEvents.forEach((e) => e.classList.remove('older-event'));
  }

  private updateFilling(
    selectedEvent: HTMLElement,
    filling: HTMLElement,
    totWidth: number
  ): void {
    const eventLeft = selectedEvent.offsetLeft + selectedEvent.offsetWidth / 2;
    const scaleValue = eventLeft / totWidth;
    this.setTransformValue(filling, 'scaleX', scaleValue.toString());
  }

  private updateVisibleContent(
    event: HTMLElement,
    eventsContent: HTMLElement
  ): void {
    const eventDate = event.dataset['date']; // Corregido
    if (!eventDate) {
      console.error(
        'El evento no tiene una fecha válida en el atributo data-date.'
      );
      return;
    }
    const visibleContent = eventsContent.querySelector(
      '.selected'
    ) as HTMLElement;
    const selectedContent = eventsContent.querySelector(
      `[data-date="${eventDate}"]`
    ) as HTMLElement;

    if (!selectedContent) return;

    const isFollowing =
      visibleContent.compareDocumentPosition(selectedContent) &
      Node.DOCUMENT_POSITION_FOLLOWING;
    const classEntering = `selected enter-${isFollowing ? 'right' : 'left'}`;
    const classLeaving = `leave-${isFollowing ? 'left' : 'right'}`;

    selectedContent.className = classEntering;
    visibleContent.className = classLeaving;

    visibleContent.addEventListener('animationend', () => {
      visibleContent.classList.remove('leave-right', 'leave-left');
      selectedContent.classList.remove('enter-right', 'enter-left');
    });
  }

  private getTranslateValue(element: HTMLElement): number {
    const style = window.getComputedStyle(element);
    const matrix = style.transform.match(/matrix.*\((.+)\)/);
    return matrix ? parseFloat(matrix[1].split(', ')[4]) : 0;
  }
}
