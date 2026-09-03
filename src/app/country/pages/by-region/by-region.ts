import { Component, input } from '@angular/core';

import { CountryList } from '../../components/country-list/country-list';
import { RESTCountryResponse } from '../../interfaces/rest-countries.interface';

@Component({
  selector: 'app-by-region',
  imports: [ CountryList],
  templateUrl: './by-region.html',
})
export class ByRegion {

  countries = input.required<RESTCountryResponse | null>();
}
