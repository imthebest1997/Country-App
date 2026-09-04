import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { HttpClient } from '@angular/common/http';
import type { RESTCountryResponse } from '../interfaces/rest-countries.interface';
import { environment } from '../../../environments/environment';

const API_URL = 'https://api.restcountries.com/countries/v5';

@Injectable({providedIn: 'root'})
export class CountryService {

  private http = inject(HttpClient);


  searchByCapital(query: string): Observable<Country[]> | undefined {
    if (query.length === 0) return;

    query = query.toLowerCase().trim();
    return this.http.get<RESTCountryResponse>(`${API_URL}/capitals?q=${query}`, {
      headers: {
        'Authorization': `Bearer ${environment.API_KEY_COUNTRIES}`
      }
    }).pipe(
      map((restCountries: RESTCountryResponse) => {
        return CountryMapper.RestCountryResponseToCountries(restCountries.data.objects);
      }),
      catchError((error) => {
        console.error('Error searching countries by capital:', error);
        return throwError(() => new Error(`Error searching countries by capital with the query: ${query}`));
      })
    );
  }
}
