import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { LocationSearchService } from './locationSearch.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

@Injectable({
  providedIn: 'root'
})
export class AppComponent {
  title = 'weatherApp';
  search:string = '';
  value:string = '';
  temperature:any;
  latitude: number | undefined;
  longitude: number | undefined;
  locationName: string | undefined;
  errorMessage: string | undefined;
  locations: any[] = [];
  searchControl = new FormControl();


  constructor(private http:HttpClient, private locationSearchService: LocationSearchService) {
    // this.searchControl.valueChanges.pipe(
    //   debounceTime(300),
    //   distinctUntilChanged(),
    //   switchMap((term: string) => this.locationSearchService.searchLocations(term))
    // ).subscribe((response: any[]) => {
    //   this.locations = response;
    //   console.log(this.locations);
    // });
  }

  ngOnInit() {
    this.defaultLocation();
  }

  defaultLocation():void {
    if (!navigator.geolocation) {
      this.errorMessage = "Geolocation is not supported by your browser.";
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.http.get<any>(`http://localhost:8080/?lat=${this.latitude}&long=${this.longitude}`).subscribe(
          data => {
            this.value = data.location;
            this.temperature = data.temperature
          },
        )
      },
      (error) => {
        switch(error.code) {
          case error.PERMISSION_DENIED:
            this.errorMessage = "User denied the request for Geolocation.";
            break;
          case error.POSITION_UNAVAILABLE:
            this.errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            this.errorMessage = "The request to get user location timed out.";
            break;
          default:
            this.errorMessage = "An unknown error occurred.";
            break;
        }
      }
    );
  }

  searchTemperature(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.value= this.search;
      this.http.get<any>(`http://localhost:8080/?location=${this.value}`).subscribe(
        data => {
          this.temperature = data;
        },
        error => {
          this.temperature = "invalid location"
        }
      )
    }
  }
}
