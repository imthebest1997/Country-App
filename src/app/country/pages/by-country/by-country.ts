import { Component } from '@angular/core';
import { CountryList } from '../../components/country-list/country-list';
import { SearchInput } from '../../components/search-input/search-input';

@Component({
  selector: 'app-by-country',
  imports: [SearchInput, CountryList],
  templateUrl: './by-country.html',
})
export class ByCountry {

  onSearch(value: string) {
    
  }
}
