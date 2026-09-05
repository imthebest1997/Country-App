import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';

import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { HttpClient } from '@angular/common/http';
import type { RESTCountryResponse } from '../interfaces/rest-countries.interface';
import { environment } from '../../../environments/environment';

const API_URL = 'https://api.restcountries.com/countries/v5';

@Injectable({ providedIn: 'root' })
export class CountryService {

  private http = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {
    return this.searchData(query, `${API_URL}/capitals?q=${query}`, 'Error searching countries by capital');
  }

  searchByCountry(query: string): Observable<Country[]> {
    return this.searchData(query, `${API_URL}?q=${query}`, 'Error searching countries');
  }

  searchByRegion(region: string): Observable<Country[]> {
    return this.searchData(region, `${API_URL}/regions/${region}`, 'Error searching countries by region');
  }

  private searchData(query: string, url: string, errMsg: string): Observable<Country[]> {
    if (query.length === 0) return of([]);

    query = query.toLowerCase().trim();
    return this.http.get<RESTCountryResponse>(url, {
      headers: {
        'Authorization': `Bearer ${environment.API_KEY_COUNTRIES}`
      }
    }).pipe(
      map((restCountries: RESTCountryResponse) => {
        console.log(restCountries);
        return CountryMapper.RestCountryResponseToCountries(restCountries.data.objects);
      }),
      catchError((error) => {
        console.error(`${errMsg}: ${error}`);
        return throwError(() => new Error(`${errMsg}: ${query}`));
      })
    );
  }
}
