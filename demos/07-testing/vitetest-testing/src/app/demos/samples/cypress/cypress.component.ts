import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MarkdownRendererComponent } from '../../../shared/markdown-renderer/markdown-renderer.component';

@Component({
    selector: 'app-cypress',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './cypress.component.html',
    styleUrls: ['./cypress.component.scss'],
    imports: [MarkdownRendererComponent]
})
export class CypressComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
