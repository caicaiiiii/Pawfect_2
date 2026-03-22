import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderPets } from '../../shared/header-pets/header-pets'
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, HeaderPets, Footer],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {}
