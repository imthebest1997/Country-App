import { Country } from "../interfaces/country.interface";
import type { CountryResponse } from "../interfaces/rest-countries.interface";

export class CountryMapper {
  static RestCountryResponseToCountry(country: CountryResponse): Country {
    return {
      code: country.codes.alpha_2,
      flag: country.flag.emoji,
      flagSvg: country.flag.url_svg,
      name: country.names.translations['spa'].official,
      capital: country.capitals[0]?.name ?? 'Sin capital',
      population: country.population,
      region: country.region,
      subRegion: country.subregion,
    }
  }

  static RestCountryResponseToCountries(countries: CountryResponse[]): Country[] {
    return countries.map((country) => this.RestCountryResponseToCountry(country));
  }

}
