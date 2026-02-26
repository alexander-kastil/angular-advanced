import { Component, HostListener, ChangeDetectionStrategy, inject, signal } from '@angular/core';
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
  ],
  // TODO: This component has been partially migrated to be zoneless-compatible.
  // After testing, this should be updated to ChangeDetectionStrategy.OnPush.
  changeDetection: ChangeDetectionStrategy.Default
})
export class SidePanelComponent {
  sns = inject(SnackbarService);
  eb = inject(SidePanelService);
  sidenav = inject(SideNavService);
  rendererState = inject(RendererStateService);
  readonly editorDisplayed = signal(false);
  readonly icon = signal("create");

  toggleEditor() {
    if (this.editorDisplayed()) {
      this.eb.triggerCmd(SidebarActions.HIDE_MARKDOWN);
    } else {
      this.eb.triggerCmd(SidebarActions.SHOW_MARKDOWN);
    }
    this.editorDisplayed.set(!this.editorDisplayed());
    this.icon.set(this.editorDisplayed() ? "close" : "create");
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
