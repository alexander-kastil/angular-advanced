import { Component, model } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-detail-card-model',
    imports: [MatIconModule],
    templateUrl: './detail-card-model.component.html',
    styleUrl: './detail-card-model.component.scss'
})
export class DetailCardModelComponent {
  expanded = model(false);
  toggle() {
    console.log('toggling');
    this.expanded.set(!this.expanded());
  }
}
