import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MarkdownRendererComponent } from '../../../shared/markdown-renderer/markdown-renderer.component';
import { DetailCardModelComponent } from './detail-card-model/detail-card-model.component';

@Component({
  selector: 'app-model-inputs',
  imports: [MatButtonModule, DetailCardModelComponent, MarkdownRendererComponent],
  templateUrl: './model-inputs.component.html',
  styleUrl: './model-inputs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModelInputsComponent {
  expandedState = signal(false);
}
