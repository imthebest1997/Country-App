import { Injectable, inject } from '@angular/core';
import { Observable, catchError, delay, map, of, tap, throwError } from 'rxjs';

import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { HttpClient } from '@angular/common/http';
import type { RESTCountryResponse } from '../interfaces/rest-countries.interface';
import { Region } from '../interfaces/region.type';
import { environment } from '../../../environments/environment';

const API_URL = 'https://api.restcountries.com/countries/v5';
type SearchType = 'capital' | 'country' | 'region' | 'code';

@Injectable({ providedIn: 'root' })
export class CountryService {

  private http = inject(HttpClient);

  private queryCache = new Map<SearchType, Map<string, Country[]>>([
    ['capital', new Map<string, Country[]>()],
    ['country', new Map<string, Country[]>()],
    ['region', new Map<Region, Country[]>()],
    ['code', new Map<string, Country[]>()],
  ]);

  searchByCapital(query: string): Observable<Country[]> {
    return this.searchData(query, `${API_URL}/capitals?q=${query}`, 'Error searching countries by capital', 'capital');
  }

  searchByCountry(query: string): Observable<Country[]> {
    return this.searchData(query, `${API_URL}?q=${query}`, 'Error searching countries', 'country');
  }

  searchByRegion(region: Region): Observable<Country[]> {
    return this.searchData(region, `${API_URL}/region/${region}`, 'Error searching countries by region', 'region');
  }

  searchCountryByCode(code: string): Observable<Country[]> {
    return this.searchData(code, `${API_URL}/code?q=${code}`, 'Error searching country by code', 'code');
  }

  private searchData(query: string, url: string, errMsg: string, type: SearchType): Observable<Country[]> {

    query = query.toLowerCase().trim();

    if (query.length === 0) return of([]);

    const cache = this.queryCache.get(type)!;

    if (cache.has(query)) {
      return of(cache.get(query) ?? []);
    }

    return this.http.get<RESTCountryResponse>(url, {
      headers: {
        'Authorization': `Bearer ${environment.API_KEY_COUNTRIES}`
      }
    }).pipe(
      map((restCountries: RESTCountryResponse) => {
        return CountryMapper.RestCountryResponseToCountries(restCountries.data.objects);
      }),
      tap((countries: Country[]) => {
        cache.set(query, countries);
      }),
      delay(500),
      catchError((error) => {
        console.error(`${errMsg}: ${error}`);
        return throwError(() => new Error(`${errMsg}: ${query}`));
      })
    );
  }
}
