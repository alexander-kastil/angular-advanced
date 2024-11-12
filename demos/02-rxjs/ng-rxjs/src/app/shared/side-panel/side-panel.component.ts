import { Component, inject } from '@angular/core';
import { SnackbarService } from '../snackbar/snackbar.service';
import { ThemeService } from '../theme/theme.service';
import { SidePanelActions } from './side-panel.actions';
import { SidePanelService } from './side-panel.service';
import { SideNavService } from '../sidenav/sidenav.service';
import { StatefulDemoService } from '../../demos/samples/stateful/stateful-demo.service';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton } from '@angular/material/button';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss'],
  imports: [
    MatToolbar,
    MatToolbarRow,
    MatMiniFabButton,
    MatIcon,
  ]
})
export class SidePanelComponent {
  sns = inject(SnackbarService);
  eb = inject(SidePanelService);
  ts = inject(ThemeService);
  statefulDS = inject(StatefulDemoService);
  editorDisplayed = false;
  sideNav = inject(SideNavService);
  icon = "create";

  toggleTheme() {
    this.ts.toggleTheme();
  }

  toggleEditor() {
    if (this.editorDisplayed) {
      this.eb.triggerCmd(SidePanelActions.HIDE_MARKDOWN);
    } else {
      this.eb.triggerCmd(SidePanelActions.SHOW_MARKDOWN);
    }
    this.editorDisplayed = !this.editorDisplayed;
    this.icon = this.editorDisplayed ? "close" : "create";
  }

  toggleSideNav() {
    this.sideNav.toggleMenuVisibility();
  }

  showUpload() {
    this.sns.displayAlert('Info', 'Not implemented - just a Demo');
  }

  addDemo() {
    const newDemo = {
      "id": 27,
      "url": "langfeatures",
      "title": "Language Features",
      "sortOrder": 0,
      "visible": true,
    };
    this.statefulDS.addDemo(newDemo);
  }
}
