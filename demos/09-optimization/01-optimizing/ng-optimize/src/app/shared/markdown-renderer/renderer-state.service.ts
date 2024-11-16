import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RendererStateService {
  #visible = signal<boolean>(true);

  instructionsVisible() {
    return this.#visible.asReadonly();
  }

  setVisibility(visible: boolean) {
    this.#visible.set(visible);
  }

  toggleVisibility() {
    this.#visible.set(!this.#visible());
  }
}
