import { ByCapitalPage } from "./pages/by-capital-page/by-capital-page";
import { ByCountry } from "./pages/by-country/by-country";
import { ByRegion } from "./pages/by-region/by-region";
import { CountryLayout } from "../layouts/CountryLayout/CountryLayout";
import { CountryPage } from "./pages/country-page/country-page";
import { Routes } from "@angular/router";

export const countryRoutes: Routes = [
  {
    path: "",
    component: CountryLayout,
    children: [
      {
        path: 'by-capital',
        component: ByCapitalPage
      },
      {
        path: 'by-country',
        component: ByCountry
      },
      {
        path: 'by-region',
        component: ByRegion
      },
      {
        path: 'by/:code',
        component: CountryPage
      },
      {
        path: "**",
        redirectTo: "by-capital"
      }
    ],
  },
];


export default countryRoutes;
