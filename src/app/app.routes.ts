import { HomePage } from './shared/pages/home-page/home-page';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "",
    component: HomePage
  },
  {
    path: "country",
    loadChildren: () => import("./country/country.routes")
  },
  {
    path: "**",
    redirectTo: ''
  }
];
