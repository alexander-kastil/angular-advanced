import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { LayoutStore } from '../layout/layout.store';
import { SideNavService } from '../sidenav/sidenav.service';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton } from '@angular/material/button';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss'],
  imports: [
    MatToolbar,
    MatToolbarRow,
    MatMiniFabButton,
    MatIcon,
    MatTooltipModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidePanelComponent {
  layout = inject(LayoutStore);
  sidenav = inject(SideNavService);

  markdownPaneVisible = this.layout.markdownPaneVisible;
  isEditorActive = this.layout.isEditorActive;

  toggleSideNav() {
    this.sidenav.toggleMenuVisibility();
  }

  showGuide() {
    this.layout.showGuide();
  }

  toggleEditor() {
    this.layout.toggleEditor();
  }
}
