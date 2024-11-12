import { Component, HostListener, inject } from '@angular/core';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SideNavFacade } from '../../state/sidenav.facade';
import { RendererStateService } from '../markdown-renderer/renderer-state.service';
import { SnackbarService } from '../snackbar/snackbar.service';
import { SidebarActions } from './sidebar.actions';
import { SidePanelService } from './sidepanel.service';

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
  eb = inject(SidePanelService);
  rendererState = inject(RendererStateService);
  editorDisplayed = false;
  sidenav = inject(SideNavFacade);
  icon = "create";

  toggleEditor() {
    if (this.editorDisplayed) {
      this.eb.triggerCmd(SidebarActions.HIDE_MARKDOWN);
    } else {
      this.eb.triggerCmd(SidebarActions.SHOW_MARKDOWN);
    }
    this.editorDisplayed = !this.editorDisplayed;
    this.icon = this.editorDisplayed ? "close" : "create";
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
