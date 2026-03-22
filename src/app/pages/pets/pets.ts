import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { DogNinjaService } from '../../services/dog-ninja.service';

interface PetCard {
  name: string;
  route: string;
  image: string;
}

@Component({
  selector: 'app-pets',
  standalone: true,
  imports: [CommonModule, RouterLink, Header, Footer],
  templateUrl: './pets.html',
  styleUrl: './pets.css'
})
export class Pets implements OnInit {
  private dogService = inject(DogNinjaService);

  petCards: PetCard[] = [
    { name: 'Golden Retriever', route: '/pets/golden-retriever', image: 'assets/images/pets-holder.png' },
    { name: 'Siberian Husky', route: '/pets/siberian-husky', image: 'assets/images/pets-holder.png' },
    { name: 'Beagle', route: '/pets/beagle', image: 'assets/images/pets-holder.png' },
    { name: 'German Shepherd', route: '/pets/german-shepherd', image: 'assets/images/pets-holder.png' },
    { name: 'Pomeranian', route: '/pets/pomeranian', image: 'assets/images/pets-holder.png' },
    { name: 'Shih Tzu', route: '/pets/shih-tzu', image: 'assets/images/pets-holder.png' },
    { name: 'Labrador Retriever', route: '/pets/labrador-retriever', image: 'assets/images/pets-holder.png' },
    { name: 'French Bulldog', route: '/pets/french-bulldog', image: 'assets/images/pets-holder.png' },
    { name: 'Dachshund', route: '/pets/dachshund', image: 'assets/images/pets-holder.png' },
    { name: 'Rottweiler', route: '/pets/rottweiler', image: 'assets/images/pets-holder.png' },
    { name: 'Border Collie', route: '/pets/border-collie', image: 'assets/images/pets-holder.png' },
    { name: 'Chihuahua', route: '/pets/chihuahua', image: 'assets/images/pets-holder.png' },
    { name: 'Corgi', route: '/pets/corgi', image: 'assets/images/pets-holder.png' },
    { name: 'Poodle', route: '/pets/poodle', image: 'assets/images/pets-holder.png' },
    { name: 'Doberman', route: '/pets/doberman', image: 'assets/images/pets-holder.png' },
    { name: 'Maltese', route: '/pets/maltese', image: 'assets/images/pets-holder.png' }
  ];

  ngOnInit(): void {
    this.loadImages();
  }

  loadImages(): void {
    const requests = this.petCards.map(card =>
      this.dogService.getDogByName(card.name).pipe(
        catchError(() => of([]))
      )
    );

    forkJoin(requests).subscribe(results => {
      this.petCards = this.petCards.map((card, i) => {
        const result = results[i];
        const image = result && result.length > 0
          ? result[0].image_link
          : 'assets/images/pets-holder.png';

        return {
          ...card,
          image
        };
      });
    });
  }
}
