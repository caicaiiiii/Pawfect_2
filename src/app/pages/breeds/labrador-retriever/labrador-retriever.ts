import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { HeaderPets } from '../../../shared/header-pets/header-pets';
import { Footer } from '../../../shared/footer/footer';
import { DogInfoCarousel } from '../../../shared/dog-info-carousel/dog-info-carousel';
import { DogNinjaBreed, DogNinjaService } from '../../../services/dog-ninja.service';

@Component({
  selector: 'app-labrador-retriever',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HeaderPets,
    Footer,
    DogInfoCarousel
  ],
  templateUrl: './labrador-retriever.html',
  styleUrl: './labrador-retriever.css',
})
export class LabradorRetriever implements OnInit {
  private dogNinjaService = inject(DogNinjaService);
  private cdr = inject(ChangeDetectorRef);

  breed: DogNinjaBreed | null = null;
  loading = true;
  error = '';

  ngOnInit(): void {
    this.loadBreed();
  }

  loadBreed(): void {
    this.loading = true;
    this.error = '';
    this.breed = null;

    this.dogNinjaService.getDogByName('labrador retriever').subscribe({
      next: (response: DogNinjaBreed[]) => {
        console.log('API response:', response);

        if (response && response.length > 0) {
          this.breed = this.findBestMatch(response, 'labrador retriever');
        } else {
          this.error = 'Breed not found.';
        }

        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('API Ninjas error:', err);
        this.error = 'Failed to load breed information.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  private findBestMatch(results: DogNinjaBreed[], targetName: string): DogNinjaBreed {
    const normalizedTarget = this.normalize(targetName);

    const exact = results.find(
      item => this.normalize(item.name) === normalizedTarget
    );
    if (exact) return exact;

    const partial = results.find(
      item => this.normalize(item.name).includes(normalizedTarget)
    );
    if (partial) return partial;

    return results[0];
  }

  private normalize(value: string): string {
    return (value || '')
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  getHeroSubtitle(): string {
    if (!this.breed) return '';

    const traits: string[] = [];

    if (this.breed.energy >= 4) traits.push('high-energy');
    if (this.breed.playfulness >= 4) traits.push('playful');
    if (this.breed.good_with_children >= 4) traits.push('family-friendly');
    if (this.breed.trainability >= 4) traits.push('easy to train');
    if (this.breed.protectiveness >= 4) traits.push('protective');

    return traits.length
      ? traits.slice(0, 3).join(', ')
      : 'A unique dog breed with distinct care and behavior needs.';
  }

  getScoreLabel(score: number | undefined): string {
    if (score == null) return 'Unknown';
    if (score <= 2) return 'Low';
    if (score === 3) return 'Moderate';
    return 'High';
  }

  getScorePercent(score: number | undefined): number {
    if (score == null) return 0;
    return (score / 5) * 100;
  }
}
