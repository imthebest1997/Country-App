import { Component, input } from '@angular/core';

import type { Country } from '../../interfaces/country.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'country-list',
  imports: [RouterLink],
  templateUrl: './country-list.html',
})
export class CountryList {
  countries = input.required<Country[]>();
}
