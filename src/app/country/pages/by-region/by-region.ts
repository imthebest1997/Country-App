import { Component, input } from '@angular/core';

import { RESTCountryResponse } from '../../interfaces/rest-countries.interface';

@Component({
  selector: 'app-by-region',
  imports: [ ],
  templateUrl: './by-region.html',
})
export class ByRegion {

  countries = input.required<RESTCountryResponse | null>();
}
