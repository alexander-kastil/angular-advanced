import { Component, OnInit } from '@angular/core';
import { MarkdownRendererComponent } from '../../../shared/markdown-renderer/markdown-renderer.component';

@Component({
    selector: 'app-router-animations',
    templateUrl: './router-animations.component.html',
    styleUrls: ['./router-animations.component.scss'],
    standalone: true,
    imports: [MarkdownRendererComponent]
})
export class RouterAnimationsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
