import {
  AfterViewInit,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
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
  @ViewChild('eventsWrapper') eventsWrapper!: ElementRef<HTMLElement>;
  @ViewChild('prevButton') prevButton!: ElementRef<HTMLElement>;
  @ViewChild('nextButton') nextButton!: ElementRef<HTMLElement>;
  @ViewChild('eventsContainer') eventsContainer!: ElementRef<HTMLElement>;

  eventsMinDistance = 120;
  selected = 1;
  first = 1;
  itemSelect: any = {};
  safeUrl: SafeResourceUrl | null = null;
  events: EventInfo[] = [];
  eventsAll: Event[] = [];
  private readonly SCROLL_SPEED = 50;

  constructor(
    private readonly apiService: ApiService,
    private readonly sanitizer: DomSanitizer,
    private readonly setting: SettingService,
    private readonly renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.setting.lang$.subscribe(() => this.fillEvents());

    this.apiService.getEvents().subscribe({
      next: (data) => {
        this.eventsAll = data.data;
        this.fillEvents();
        if (this.eventsContainer) {
          this.renderer.setStyle(
            this.eventsContainer.nativeElement,
            'width',
            this.calculateEventsWidth()
          );
        }
      },
      error: (err) => console.error('Error al cargar eventos:', err),
    });
  }

  ngAfterViewInit(): void {
    this.eventsWrapper.nativeElement.addEventListener('wheel', (event) => {
      event.preventDefault();

      this.eventsWrapper.nativeElement.scrollBy({
        left: event.deltaY < 0 ? -30 : 30,
      });
    });

 
    setTimeout(() => this.scrollToSelected(), 5000);
  }



 

  fillEvents(): void {
    this.events = this.eventsAll.map((event) => ({
      ...event,
      title: this.setting.lang === Lang.en ? event.title : event.spanish_title,
      description:
        this.setting.lang === Lang.en
          ? event.description
          : event.spanish_description,
    }));

    this.itemSelect =
      this.events.find((event) => event.is_initial) || this.events[0];
    this.first = this.itemSelect?.id ?? 1;
    this.selected = this.itemSelect?.id ?? 1;
    this.selectItem(this.selected);
  }

  selectItem(id: number): void {
    this.selected = id;
    this.itemSelect = this.events.find((item) => item.id === id);

    if (this.itemSelect && this.isYoutube(this.itemSelect.type)) {
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.itemSelect.url
      );
    }

    this.scrollToSelected();
  }

  scrollToSelected(): void {
    if (!this.eventsWrapper) return;

    const index = this.events.findIndex((item) => item.id === this.selected);
    if (index === -1) return;

    const scrollDistance = index * 100;
    this.eventsWrapper.nativeElement.scrollTo({
      left: scrollDistance,
      behavior: 'smooth',
    });

    const eventElement = document.getElementById(`event_${this.selected}`);
    eventElement?.scrollIntoView({ behavior: 'smooth', block: 'end' });

    this.updateNavButtons();
  }

  calculateEventsWidth(): string {
    if (!this.eventsWrapper) return '0px';
    const wrapperWidth = this.eventsWrapper.nativeElement.offsetWidth;
    const calculatedWidth =
      this.eventsMinDistance * (this.events.length + 1) + 50;
    return `${Math.max(calculatedWidth, wrapperWidth)}px`;
  }

  updateNavButtons(): void {
    if (!this.eventsWrapper) return;

    const eventsEl = this.eventsWrapper.nativeElement;
    const atStart = eventsEl.scrollLeft === 0;
    const atEnd =
      eventsEl.scrollLeft + eventsEl.clientWidth >= eventsEl.scrollWidth - 50;

    this.prevButton.nativeElement.classList.toggle('inactive', atStart);
    this.nextButton.nativeElement.classList.toggle('inactive', atEnd);
  }

  prev(): void {
    if (!this.eventsWrapper) return;

    const containerWidth = this.eventsWrapper.nativeElement.offsetWidth * -1;
    this.eventsWrapper.nativeElement.scrollBy({
      left: containerWidth,
      behavior: 'smooth',
    });

    setTimeout(() => this.updateNavButtons(), 500);
  }

  next(): void {
    if (!this.eventsWrapper) return;

    const containerWidth = this.eventsWrapper.nativeElement.offsetWidth;
    this.eventsWrapper.nativeElement.scrollBy({
      left: containerWidth,
      behavior: 'smooth',
    });

    setTimeout(() => this.updateNavButtons(), 500);
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
