import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { Popup, Pet } from '../../shared/popup/popup';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterLink, Header, Footer, Popup],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main {
  selectedPet: Pet | null = null;
  popupVisible = false;

  currentPage = 0;
  currentOffset = 0;

  readonly totalCards = 9;
  readonly cardWidth = 310;
  readonly cardGap = 30;

  openPopup(pet: Pet): void {
    this.selectedPet = pet;
    this.popupVisible = true;
    document.body.classList.add('lock');
  }

  closePopup(): void {
    this.popupVisible = false;
    this.selectedPet = null;
    document.body.classList.remove('lock');
  }

  get cardsPerView(): number {
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 767) {
        return 1;
      }

      if (window.innerWidth <= 1100) {
        return 2;
      }
    }

    return 3;
  }

  get maxPage(): number {
    return Math.ceil(this.totalCards / this.cardsPerView) - 1;
  }

  get slideStep(): number {
    return this.cardsPerView * (this.cardWidth + this.cardGap);
  }

  nextSlide(): void {
    if (this.currentPage >= this.maxPage) {
      this.currentPage = 0;
    } else {
      this.currentPage++;
    }

    this.updateOffset();
  }

  prevSlide(): void {
    if (this.currentPage <= 0) {
      this.currentPage = this.maxPage;
    } else {
      this.currentPage--;
    }

    this.updateOffset();
  }

  updateOffset(): void {
    this.currentOffset = this.currentPage * this.slideStep;
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.currentPage = 0;
    this.currentOffset = 0;
  }
}
