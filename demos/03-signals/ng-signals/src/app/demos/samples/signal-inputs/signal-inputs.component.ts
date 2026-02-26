import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MarkdownRendererComponent } from '../../../shared/markdown-renderer/markdown-renderer.component';
import { SkillsContainerComponent } from "../../../skills/skills-container/skills-container.component";

@Component({
    selector: 'app-signal-inputs',
    imports: [MarkdownRendererComponent, SkillsContainerComponent],
    templateUrl: './signal-inputs.component.html',
    styleUrl: './signal-inputs.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignalInputsComponent {

}
