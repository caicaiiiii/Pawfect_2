import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-dog-care',
  standalone: true,
  imports: [CommonModule, RouterLink, Header, Footer],
  templateUrl: './dog-care.html',
  styleUrl: './dog-care.css'
})
export class DogCare {}
