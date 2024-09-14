import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MarkdownRendererComponent } from 'src/app/shared/markdown-renderer/markdown-renderer.component';
import { DetailCardModelComponent } from './detail-card-model/detail-card-model.component';

@Component({
  selector: 'app-model-inputs',
  standalone: true,
  imports: [MatButtonModule, DetailCardModelComponent, MarkdownRendererComponent],
  templateUrl: './model-inputs.component.html',
  styleUrl: './model-inputs.component.scss'
})
export class ModelInputsComponent {
  expandedState = signal(false);
}
