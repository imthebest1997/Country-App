import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.html',
})
export class SearchInput {

  // Metodo que va a usar el padre
  value = output<string>();

  // Placeholder que va a enviar el padre
  searchPlaceholder = input('Buscar',{transform: trimString});
}

function trimString(value: string | undefined): string {
  return value?.trim() ?? '';
}
