import { Component, HostListener, inject } from '@angular/core';
import { SnackbarService } from '../snackbar/snackbar.service';
import { SidebarActions } from './sidebar.actions';
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
  imports: [
    MatToolbar,
    MatToolbarRow,
    MatMiniFabButton,
    MatIcon,
    MatTooltipModule
  ]
})
export class SidePanelComponent {
  sns = inject(SnackbarService);
  sidePanelService = inject(SidePanelService);
  rendererState = inject(RendererStateService);
  editorDisplayed = false;
  sidenav = inject(SideNavService);
  icon = "create";

  toggleEditor() {
    this.sidePanelService.toggleEditorVisibility();
    this.icon = this.sidePanelService.getVisible()() ? "close" : "create";
  }

  toggleSideNav() {
    this.sidenav.toggleMenuVisibility();
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
