// location-search.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationSearchService {
  constructor(private http: HttpClient) {}

  searchLocations(query: string): Observable<any> {
    const apiUrl = `https://crossorigin.me/https://nominatim.openstreetmap.org/search?${query}?format=json`;
    return this.http.get(apiUrl);
  }
}
