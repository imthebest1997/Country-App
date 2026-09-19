import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject, linkedSignal, resource, signal } from '@angular/core';

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

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  query = linkedSignal<string>(() => this.queryParam);


  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if (!params.query) return of([]);

      this.router.navigate(["/country/by-country"], {
        queryParams: {
          query: params.query
        }
      });

      return this.countryService.searchByCountry(params.query);
    }
  });

}
