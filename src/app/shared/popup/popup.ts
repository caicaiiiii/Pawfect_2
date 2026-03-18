import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Pet {
  name: string;
  img: string;
  type: string;
  breed: string;
  description: string;
  age: string;
  inoculations: string[];
  diseases: string[];
  parasites: string[];
}

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup.html',
  styleUrl: './popup.css'
})
export class Popup {
  @Input() pet: Pet | null = null;
  @Input() visible = false;
  @Output() close = new EventEmitter<void>();

  closePopup(): void {
    this.close.emit();
  }

  stopPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }

  getPopupImage(): string {
    if (!this.pet) return '';

    let src = this.pet.img.replace(
      'assets/images/',
      'assets/images/popup/'
    );
    src = src.replace('pets-', '');
    src = src.replace('.jpg', '.png');
    return src;
  }

  formatList(items: string[]): string {
    return items?.length ? items.join(', ') : 'None';
  }
}
