import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SidePanelService {
  #visible = signal(false);

  getVisible() {
    return this.#visible;
  }

  toggleEditorVisibility() {
    this.#visible.set(!this.#visible());
  }
}
