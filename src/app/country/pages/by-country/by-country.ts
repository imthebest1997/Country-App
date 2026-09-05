import { Component, inject, resource, signal } from '@angular/core';

import { CountryList } from '../../components/country-list/country-list';
import { CountryService } from '../../services/country';
import { SearchInput } from '../../components/search-input/search-input';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-country',
  imports: [SearchInput, CountryList],
  templateUrl: './by-country.html',
})
export class ByCountry {

  countryService = inject(CountryService);
  query = signal<string>('');

  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if (!params.query) return of([]);

      return this.countryService.searchByCountry(params.query);
    }
  });



}
