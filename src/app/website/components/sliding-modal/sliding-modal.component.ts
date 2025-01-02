import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sliding-modal',
  templateUrl: './sliding-modal.component.html',
  styleUrls: ['./sliding-modal.component.scss']
})
export class SlidingModalComponent {
  @Input() isVisible = false; // Controls visibility
  @Output() close = new EventEmitter<void>(); // Emits close event

  closeModal(): void {
    this.isVisible = false;
    this.close.emit();
  }

}
