import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { DogNinjaService, DogNinjaBreed } from '../../services/dog-ninja.service';

interface NameOption {
  name: string;
  tag: string;
}

@Component({
  selector: 'app-dog-names',
  standalone: true,
  imports: [CommonModule, FormsModule, Header, Footer],
  templateUrl: './dog-names.html',
  styleUrl: './dog-names.css'
})
export class DogNames implements OnInit {
  private dogService = inject(DogNinjaService);

  breeds: string[] = [
    'Golden Retriever',
    'Siberian Husky',
    'Beagle',
    'German Shepherd',
    'Pomeranian',
    'Shih Tzu',
    'Labrador Retriever',
    'French Bulldog',
    'Dachshund',
    'Rottweiler',
    'Border Collie',
    'Chihuahua',
    'Corgi',
    'Poodle',
    'Doberman',
    'Maltese'
  ];

  genders: string[] = ['Male', 'Female', 'Neutral'];

  selectedBreed = 'French Bulldog';
  selectedGender = 'Female';

  suggestedNames: NameOption[] = [];
  breedData: DogNinjaBreed | null = null;
  isLoadingBreed = false;
  hasGenerated = false;

  private namesByGender: Record<string, string[]> = {
    Male: ['Max', 'Buddy', 'Leo', 'Rocky', 'Teddy', 'Milo', 'Bruno', 'Scout'],
    Female: ['Luna', 'Bella', 'Daisy', 'Coco', 'Nala', 'Ruby', 'Lily', 'Mochi'],
    Neutral: ['Sunny', 'Sky', 'Echo', 'River', 'Sage', 'Biscuit', 'Ash', 'Lucky']
  };

  private breedNameMap: Record<string, string[]> = {
    'Golden Retriever': ['Buddy', 'Sunny', 'Bailey', 'Cooper', 'Honey'],
    'Siberian Husky': ['Luna', 'Nova', 'Storm', 'Ghost', 'Skye'],
    'Beagle': ['Scout', 'Bingo', 'Charlie', 'Rosie', 'Piper'],
    'German Shepherd': ['Rex', 'Athena', 'Shadow', 'Kaiser', 'Sasha'],
    'Pomeranian': ['Coco', 'Peaches', 'Teddy', 'Gigi', 'Mochi'],
    'Shih Tzu': ['Bella', 'Mimi', 'Lulu', 'Poppy', 'Toto'],
    'Labrador Retriever': ['Max', 'Buddy', 'Duke', 'Milo', 'Bailey'],
    'French Bulldog': ['Olive', 'Louie', 'Coco', 'Bean', 'Gigi'],
    'Dachshund': ['Oscar', 'Pip', 'Frankie', 'Peanut', 'Winnie'],
    'Rottweiler': ['Diesel', 'Rex', 'Thor', 'Zara', 'Tank'],
    'Border Collie': ['Scout', 'Ace', 'Skye', 'Dash', 'Willow'],
    'Chihuahua': ['Tiny', 'Chico', 'Lola', 'Pixie', 'Peanut'],
    'Corgi': ['Biscuit', 'Waffles', 'Poppy', 'Nugget', 'Mochi'],
    'Poodle': ['Paris', 'Bella', 'Coco', 'Ruby', 'Jasper'],
    'Doberman': ['Axel', 'Storm', 'Xena', 'Raven', 'Zeke'],
    'Maltese': ['Snowy', 'Angel', 'Lily', 'Pearl', 'Cloud']
  };

  ngOnInit(): void {
    this.loadBreedInfo();
    this.generateNames();
  }

  get autoStyle(): string {
    if (!this.breedData) {
      return 'Classic';
    }

    if (this.breedData.playfulness >= 4) {
      return 'Playful';
    }

    if (this.breedData.protectiveness >= 4) {
      return 'Strong';
    }

    if (this.breedData.trainability >= 4) {
      return 'Smart';
    }

    if (this.breedData.good_with_children >= 4) {
      return 'Friendly';
    }

    return 'Classic';
  }

  onBreedChange(): void {
    this.loadBreedInfo();
    this.generateNames();
  }

  onGenderChange(): void {
    this.generateNames();
  }

  generateAgain(): void {
    this.generateNames();
  }

  loadBreedInfo(): void {
    this.isLoadingBreed = true;

    this.dogService.getDogByName(this.selectedBreed).subscribe({
      next: (response) => {
        this.breedData = response.length ? response[0] : null;
        this.isLoadingBreed = false;
      },
      error: () => {
        this.breedData = null;
        this.isLoadingBreed = false;
      }
    });
  }

  generateNames(): void {
    const breedPool = this.breedNameMap[this.selectedBreed] ?? [];
    const genderPool = this.namesByGender[this.selectedGender] ?? [];

    const combined = Array.from(new Set([...breedPool, ...genderPool]));
    const shuffled = this.shuffle(combined).slice(0, 3);

    this.suggestedNames = shuffled.map((name) => ({
      name,
      tag: this.autoStyle
    }));

    this.hasGenerated = true;
  }

  getTemperamentLabel(): string {
    if (!this.breedData) {
      return 'Lovely companion';
    }

    if (this.breedData.energy >= 4 && this.breedData.playfulness >= 4) {
      return 'Very playful and energetic';
    }

    if (this.breedData.protectiveness >= 4) {
      return 'Strong and protective';
    }

    if (this.breedData.trainability >= 4) {
      return 'Smart and easy to train';
    }

    if (this.breedData.good_with_children >= 4) {
      return 'Friendly family companion';
    }

    return 'Gentle and lovable';
  }

  private shuffle(items: string[]): string[] {
    const array = [...items];

    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }
}
