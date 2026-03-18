import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DogNinjaBreed {
  name: string;
  image_link: string;
  good_with_children: number;
  good_with_other_dogs: number;
  good_with_strangers: number;
  shedding: number;
  grooming: number;
  drooling: number;
  coat_length: number;
  playfulness: number;
  protectiveness: number;
  trainability: number;
  energy: number;
  barking: number;
  min_life_expectancy: number;
  max_life_expectancy: number;
  max_height_male: number;
  max_height_female: number;
  max_weight_male: number;
  max_weight_female: number;
  min_height_male: number;
  min_height_female: number;
  min_weight_male: number;
  min_weight_female: number;
}

@Injectable({
  providedIn: 'root'
})
export class DogNinjaService {
  private http = inject(HttpClient);

  private readonly apiUrl = 'https://api.api-ninjas.com/v1/dogs';
  private readonly apiKey = '6zMLdMBmDVeKOlXYt1pGtjoDB8CMyliuyRUzA0z1';

  private get headers(): HttpHeaders {
    return new HttpHeaders({
      'X-Api-Key': this.apiKey
    });
  }

  getDogByName(name: string): Observable<DogNinjaBreed[]> {
    return this.http.get<DogNinjaBreed[]>(
      `${this.apiUrl}?name=${encodeURIComponent(name)}`,
      { headers: this.headers }
    );
  }
}
