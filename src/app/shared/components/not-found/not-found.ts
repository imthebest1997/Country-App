import { Component, inject, input } from '@angular/core';

import { Location } from '@angular/common';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.html',
})
export class NotFound {
  countryCode = input<string>('');

  location = inject(Location);


  goBack() {
    this.location.back();
  }

}
