import { Component, inject, signal } from '@angular/core';

import type { Country } from '../../interfaces/country.interface';
import { CountryList } from '../../components/country-list/country-list';
import { CountryService } from '../../services/country';
import { SearchInput } from '../../components/search-input/search-input';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPage {

  countryService = inject(CountryService);

  isLoading = signal(false);
  isError = signal<string|null>(null);
  countries = signal<Country[]>([]);

  onSearch(query: string) {
    if(this.isLoading()) return;

    this.isLoading.set(true);
    this.isError.set(null);

    this.countryService.searchByCapital(query)?.subscribe((countries) => {
        this.isLoading.set(false);
        this.countries.set(countries);
        console.log(countries);
    });
  }

}
