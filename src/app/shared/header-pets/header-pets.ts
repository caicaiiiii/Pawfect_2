import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-pets',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header-pets.html',
  styleUrl: './header-pets.css'
})
export class HeaderPets {
  menuOpen = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
}
