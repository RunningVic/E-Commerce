import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private contryUrl: string = "http://localhost:8080/api/countries";
  private stateUrl: string = "http://localhost:8080/api/states";

  constructor(private httpClient: HttpClient) { }

  getCreditCardMonth(startMonth: number): Observable<number[]> {
    let data: number[] = [];
    for (let month = startMonth; month <= 12; month++) {
      data.push(month);
    }
    return of(data);
  }

  getCreditCardYear(): Observable<number[]> {
    let data: number[] = [];
    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;
    for (let year = startYear; year <= endYear; year++) {
      data.push(year);
    }
    return of(data);
  }

  getCountries(): Observable<Country[]> {
    return this.httpClient.get<GetResponseCountry>(this.contryUrl).pipe(
      map(response => response._embedded.countries)
    )
  }

  getStates(countryCode: string): Observable<State[]> {
    const searchStateUrl = `${this.stateUrl}/search/findByCountryCode?code=${countryCode}`;
    return this.httpClient.get<GetResponseState>(searchStateUrl).pipe(
      map(response => response._embedded.states)
    )
  }
}

interface GetResponseCountry {
  _embedded: {
    countries: Country[]
  }
}

interface GetResponseState {
  _embedded: {
    states: State[]
  }
}
