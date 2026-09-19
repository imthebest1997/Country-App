import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject, linkedSignal, signal } from '@angular/core';

import { CountryList } from '../../components/country-list/country-list';
import { CountryService } from '../../services/country';
import { SearchInput } from '../../components/search-input/search-input';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPage {

  countryService = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = linkedSignal<string>(() => this.queryParam);

  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if (!params.query) return of([]);

      this.router.navigate(["/country/by-capital"], {
        queryParams: {
          query: params.query
        }
      });

      return this.countryService.searchByCapital(params.query);
    }
  });

  //! Funciona con promesas
  // countryResource = resource({
  //   params: () => ({ query: this.query() }),
  //   loader: async ({ params }) => {
  //     if (!params.query) return [];

  //     return await firstValueFrom(
  //       this.countryService.searchByCapital(params.query)
  //     );
  //   }
  // });


  //! Metodo antiguo
  // isLoading = signal(false);
  // isError = signal<string|null>(null);
  // countries = signal<Country[]>([]);

  // onSearch(query: string) {
  //   if(this.isLoading()) return;

  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   this.countryService.searchByCapital(query)
  //     ?.subscribe({
  //       next: (countries) => {
  //         this.countries.set(countries);
  //         this.isLoading.set(false);
  //       },
  //       error: (err) => {
  //         this.isError.set(err);
  //         this.countries.set([]);
  //         this.isLoading.set(false);
  //       }
  //     }
  //   );
  // }
}
