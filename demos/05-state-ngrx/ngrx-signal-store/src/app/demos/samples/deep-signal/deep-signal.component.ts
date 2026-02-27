import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MarkdownRendererComponent } from '../../../shared/markdown-renderer/markdown-renderer.component';
import { UserProfileStore } from './user-profile.store';

@Component({
    selector: 'app-deep-signal',
    imports: [
        MarkdownRendererComponent,
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatCardContent,
        MatFormField,
        MatLabel,
        MatInput,
        FormsModule,
    ],
    providers: [UserProfileStore],
    templateUrl: './deep-signal.component.html',
    styleUrl: './deep-signal.component.scss'
})
export class DeepSignalComponent {
    store = inject(UserProfileStore);
}
