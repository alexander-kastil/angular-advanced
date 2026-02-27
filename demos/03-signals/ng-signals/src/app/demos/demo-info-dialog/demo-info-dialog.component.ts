import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { DemoItem } from '../demo-container/demo-item.model';

@Component({
    selector: 'app-demo-info-dialog',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatDialogModule, MatDividerModule, MatButtonModule],
    template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>
      <p>{{ data.teaches }}</p>
      <mat-divider />
      <p class="topic">{{ data.topic }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `,
    styles: `
    h2[mat-dialog-title] { font-size: 1.1rem; font-weight: 600; }
    mat-dialog-content { min-width: 320px; }
    p { margin: 12px 0; line-height: 1.6; }
    mat-divider { margin: 8px 0; }
    .topic { font-size: 0.8rem; color: var(--mat-sys-outline); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px; }
  `,
})
export class DemoInfoDialogComponent {
    data = inject<DemoItem>(MAT_DIALOG_DATA);
}
