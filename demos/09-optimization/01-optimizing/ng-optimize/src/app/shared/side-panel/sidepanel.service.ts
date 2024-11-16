import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SidePanelService {
  #visible = signal(false);

  getEditorVisible() {
    return this.#visible.asReadonly();
  }

  toggleEditorVisibility() {
    this.#visible.set(!this.#visible());
  }
}