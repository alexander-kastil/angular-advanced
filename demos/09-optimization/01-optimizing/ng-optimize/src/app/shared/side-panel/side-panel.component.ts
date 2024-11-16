import { Component, HostListener, inject } from '@angular/core';
import { SnackbarService } from '../snackbar/snackbar.service';
import { SidePanelService } from './sidepanel.service';
import { SideNavService } from '../sidenav/sidenav.service';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton } from '@angular/material/button';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { RendererStateService } from '../markdown-renderer/renderer-state.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss'],
  standalone: true,
  imports: [
    MatToolbar,
    MatToolbarRow,
    MatMiniFabButton,
    MatIcon,
    MatTooltipModule
  ],
})
export class SidePanelComponent {
  sns = inject(SnackbarService);
  sidePanelService = inject(SidePanelService);
  sideNavService = inject(SideNavService);
  rendererState = inject(RendererStateService);
  editorDisplayed = this.sidePanelService.getEditorVisible();
  icon = "create";

  toggleEditor() {
    this.sidePanelService.toggleEditorVisibility();
    this.icon = this.editorDisplayed() ? "close" : "create";
  }

  toggleSideNav() {
    this.sideNavService.toggleMenuVisibility();
  }

  toggleInfo() {
    this.rendererState.toggleVisibility();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'i') {
      this.toggleInfo();
      event.preventDefault();
    }
  }

}
