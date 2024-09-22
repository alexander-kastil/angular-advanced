import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/internal/operators/map';
import { BoxedDirective, ClickableDirective } from 'src/app/shared/formatting/formatting-directives';
import { MarkdownRendererComponent } from 'src/app/shared/markdown-renderer/markdown-renderer.component';
import { SkillsService } from 'src/app/skills/skills.service';

@Component({
  selector: 'app-zoneless-change-detection',
  standalone: true,
  imports: [AsyncPipe, MarkdownRendererComponent, BoxedDirective, ClickableDirective],
  templateUrl: './zoneless-change-detection.component.html',
  styleUrl: './zoneless-change-detection.component.scss'
})
export class ZonelessChangeDetectionComponent implements OnInit {
  http = inject(HttpClient);
  service = inject(SkillsService);
  counter = 0;
  tick = 0;
  stick = signal(0)
  skills = this.service.getSkills().pipe(
    map(skills => skills.slice(0, 2))
  );
  sigSkills = toSignal(this.service.getSkills().pipe(
    map(skills => skills.slice(0, 2))
  ))

  ngOnInit() {
    setInterval(() => {
      this.tick += 1;
      // this.stick.update((val) => val + 1);
    }, 1000);
  }

  incrementCounter() {
    this.counter += 1;
  }

}
