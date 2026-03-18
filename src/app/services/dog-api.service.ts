import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DogApiService {
  private http = inject(HttpClient);

  private API_URL = 'https://api.thedogapi.com/v1';
  private API_KEY = 'live_XnjduSUcRT9eUxcokffbCQ78rDPwP6cGP6K3TarN3eopayxF4av4flQGZC4fR6FL';

  private headers = new HttpHeaders({
    'x-api-key': this.API_KEY
  });

  searchBreed(name: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.API_URL}/breeds/search?q=${encodeURIComponent(name)}`,
      { headers: this.headers }
    );
  }

  getBreedDetails(breedId: number): Observable<any> {
    return this.http.get<any>(
      `${this.API_URL}/breeds/${breedId}`,
      { headers: this.headers }
    );
  }

  getBreedFacts(breedId: number): Observable<any> {
    return this.http.get<any>(
      `${this.API_URL}/breeds/${breedId}/facts?limit=5`,
      { headers: this.headers }
    );
  }
}
