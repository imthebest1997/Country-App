import { Component, inject } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { CountryInformation } from './country-information/country-information';
import { CountryService } from '../../services/country';
import { NotFound } from '../../../shared/components/not-found/not-found';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-country-page',
  imports: [NotFound, CountryInformation],
  templateUrl: './country-page.html',
})
export class CountryPage {

  countryCode = inject(ActivatedRoute).snapshot.paramMap.get('code') ?? '';
  countryService = inject(CountryService);

  countryResource = rxResource({
    params: () => ({ code: this.countryCode }),
    stream: ({ params }) => {

      if (!params.code) return of([]);

      return this.countryService.searchCountryByCode(params.code);
    }
  });
}
