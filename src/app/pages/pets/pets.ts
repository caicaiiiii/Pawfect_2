import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HeaderPets } from '../../shared/header-pets/header-pets';
import { Footer } from '../../shared/footer/footer';
import { DogNinjaService, DogNinjaBreed } from '../../services/dog-ninja.service';

interface PetCard {
  name: string;
  route: string;
  image: string;
}

@Component({
  selector: 'app-pets',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderPets, Footer],
  templateUrl: './pets.html',
  styleUrl: './pets.css'
})
export class Pets implements OnInit {

  private dogService = inject(DogNinjaService);

  petCards: PetCard[] = [
    { name: 'Golden Retriever', route: '/pets/golden-retriever', image: 'assets/images/pets-holder.png' },
    { name: 'Siberian Husky', route: '/siberian-husky', image: 'assets/images/pets-holder.png' },
    { name: 'Beagle', route: '/beagle', image: 'assets/images/pets-holder.png' },
    { name: 'German Shepherd', route: '/german-shepherd', image: 'assets/images/pets-holder.png' },
    { name: 'Pomeranian', route: '/pomeranian', image: 'assets/images/pets-holder.png' },
    { name: 'Shih Tzu', route: '/shih-tzu', image: 'assets/images/pets-holder.png' },
    { name: 'Labrador Retriever', route: '/labrador-retriever', image: 'assets/images/pets-holder.png' },
    { name: 'French Bulldog', route: '/french-bulldog', image: 'assets/images/pets-holder.png' },
    { name: 'Dachshund', route: '/dachshund', image: 'assets/images/pets-holder.png' },
    { name: 'Rottweiler', route: '/rottweiler', image: 'assets/images/pets-holder.png' },
    { name: 'Border Collie', route: '/border-collie', image: 'assets/images/pets-holder.png' },
    { name: 'Chihuahua', route: '/chihuahua', image: 'assets/images/pets-holder.png' },
    { name: 'Corgi', route: '/corgi', image: 'assets/images/pets-holder.png' },
    { name: 'Poodle', route: '/poodle', image: 'assets/images/pets-holder.png' },
    { name: 'Doberman', route: '/doberman', image: 'assets/images/pets-holder.png' },
    { name: 'Maltese', route: '/maltese', image: 'assets/images/pets-holder.png' }
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
