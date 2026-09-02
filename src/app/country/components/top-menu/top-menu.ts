import { RouterLink, RouterLinkActive } from '@angular/router';

import { Component } from '@angular/core';

@Component({
  selector: 'country-top-menu',
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './top-menu.html',
})
export class TopMenu {}
