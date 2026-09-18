import { Component, computed, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.html',
})
export class SearchInput {

  // Metodo que va a usar el padre
  value = output<string>();

  debounceTime = input<number>(500);

  // Placeholder que va a enviar el padre
  searchPlaceholder = input('Buscar',{transform: trimString});

  inputValue = signal<string>('');


  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue(); // Obtener el valor actual del signal

    const timeout = setTimeout(() => {
      this.value.emit(value); // Emitir el valor después del tiempo de espera
    }, this.debounceTime()); // Tiempo de espera en milisegundos
    
    onCleanup(() => {
      clearTimeout(timeout);    
    }); // Limpiar el timeout si el efecto se vuelve a ejecutar
  });

}

function trimString(value: string | undefined): string {
  return value?.trim() ?? '';
}
