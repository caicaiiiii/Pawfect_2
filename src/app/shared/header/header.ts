import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  menuOpen = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    this.updateBodyLock();
  }

  closeMenu(): void {
    this.menuOpen = false;
    this.updateBodyLock();
  }

  private updateBodyLock(): void {
    if (this.menuOpen) {
      document.body.classList.add('lock');
    } else {
      document.body.classList.remove('lock');
    }
  }
}
