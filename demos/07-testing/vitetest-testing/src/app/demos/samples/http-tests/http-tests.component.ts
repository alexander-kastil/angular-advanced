import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MarkdownRendererComponent } from '../../../shared/markdown-renderer/markdown-renderer.component';

@Component({
    selector: 'app-http-tests',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './http-tests.component.html',
    styleUrls: ['./http-tests.component.scss'],
    imports: [MarkdownRendererComponent]
})
export class HttpTestsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
