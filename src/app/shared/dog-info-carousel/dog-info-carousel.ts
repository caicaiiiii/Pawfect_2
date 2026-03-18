import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface DogInfoCard {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-dog-info-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dog-info-carousel.html',
  styleUrl: './dog-info-carousel.css'
})
export class DogInfoCarousel {
  @Input() title = 'Dog Care Tips';
  @Input() subtitle =
    'Helpful and easy-to-understand tips for proper dog care.';

  currentIndex = 0;

  cards: DogInfoCard[] = [
    {
      icon: '🍖',
      title: 'Feeding Recommendations',
      description:
        'Provide balanced meals based on your dog’s age, breed, and activity level to support healthy growth and energy.'
    },
    {
      icon: '🛁',
      title: 'Grooming Guidelines',
      description:
        'Regular brushing, bathing, nail trimming, and ear cleaning help maintain your dog’s hygiene and comfort.'
    },
    {
      icon: '🏃',
      title: 'Exercise Suggestions',
      description:
        'Daily walks, active play, and mental stimulation are important to keep dogs physically fit and emotionally happy.'
    },
    {
      icon: '🩺',
      title: 'Health Monitoring',
      description:
        'Routine checkups, vaccinations, and parasite prevention are essential parts of responsible dog care.'
    },
    {
      icon: '🖼️',
      title: 'Dynamic Dog Images',
      description:
        'External APIs can be used to display dog images dynamically, making the website more interactive and visually engaging.'
    },
    {
      icon: '📘',
      title: 'Breed Information',
      description:
        'External APIs can also provide breed details such as temperament, lifespan, and origin for real-time informative content.'
    }
  ];

  get visibleCards(): DogInfoCard[] {
    return this.cards.slice(this.currentIndex, this.currentIndex + 3);
  }

  next(): void {
    if (this.currentIndex < this.cards.length - 3) {
      this.currentIndex++;
    }
  }

  prev(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
}
