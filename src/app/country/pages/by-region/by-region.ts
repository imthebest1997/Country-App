import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject, input, linkedSignal, signal } from '@angular/core';

import { CountryList } from '../../components/country-list/country-list';
import { CountryService } from '../../services/country';
import { RESTCountryResponse } from '../../interfaces/rest-countries.interface';
import { Region } from '../../interfaces/region.type';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

function validateQueryParam(queryParam: string): Region {

  queryParam = queryParam.toLowerCase();

  const validRegions: Record<string, Region> = {
    'africa': 'Africa',
    'americas': 'Americas',
    'asia': 'Asia',
    'europe': 'Europe',
    'oceania': 'Oceania',
    'antarctic': "Antarctic",
  }

  return validRegions[queryParam] ?? 'Americas';
}

@Component({
  selector: 'app-by-region',
  imports: [CountryList ],
  templateUrl: './by-region.html',
})
export class ByRegion {

  countryService = inject(CountryService);

  countries = input.required<RESTCountryResponse | null>();

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';
  query = linkedSignal<string>(() => this.queryParam);
  selectedRegion = linkedSignal<Region>(() => validateQueryParam(this.query()));

  selectRegion(region: Region) {
    this.selectedRegion.set(region);
  }

  countryResource = rxResource({
    params: () => ({ region: this.selectedRegion() }),
    stream: ({ params }) => {
      if (!params.region) return of([]);

      this.router.navigate(["/country/by-region"], {
        queryParams: {
          region: params.region
        }
      });

      return this.countryService.searchByRegion(params.region);
    }
  });


}
