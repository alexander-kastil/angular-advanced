import { AsyncPipe, NgStyle } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LoadingService } from '../../shared/loading/loading.service';
import { MarkdownEditorComponent } from '../../shared/markdown-editor/markdown-editor.component';
import { SidePanelComponent } from '../../shared/side-panel/side-panel.component';
import { SidebarActions } from '../../shared/side-panel/sidebar.actions';
import { SidePanelService } from '../../shared/side-panel/sidepanel.service';
import { SideNavService } from '../../shared/sidenav/sidenav.service';
import { DemoService } from '../demo-base/demo.service';

@Component({
    selector: 'app-demo-container',
    templateUrl: './demo-container.component.html',
    styleUrls: ['./demo-container.component.scss'],
    imports: [
        MatSidenavContainer,
        MatSidenav,
        MatToolbar,
        MatToolbarRow,
        MatNavList,
        MatListItem,
        RouterLink,
        MatSidenavContent,
        NgStyle,
        RouterOutlet,
        MarkdownEditorComponent,
        SidePanelComponent,
        AsyncPipe,
    ]
})
export class DemoContainerComponent {
  destroyRef = inject(DestroyRef);
  router = inject(Router);
  route = inject(ActivatedRoute);
  ds = inject(DemoService);
  nav = inject(SideNavService);
  ls = inject(LoadingService);
  eb = inject(SidePanelService);

  title: string = environment.title;
  demos = this.ds.getItems();
  sidenavMode = this.nav.getSideNavPosition();
  sidenavVisible = this.nav.getSideNavVisible();
  isLoading = this.ls.getLoading();

  workbenchLeftMargin = this.sidenavVisible.pipe(
    map((visible: boolean) => { return visible ? { 'margin-left': '5px' } : {} })
  );

  rootRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  header = this.router.events
    .pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.rootRoute(this.route)),
      filter((route: ActivatedRoute) => route.outlet === 'primary'),
      map((route: ActivatedRoute) => route.component != null
        ? `Component: ${route.component.name.substring(1)}`
        : 'Please select a demo')
    );

  showMdEditor = this.eb
    .getCommands()
    .pipe(
      map((action: SidebarActions) => (action === SidebarActions.HIDE_MARKDOWN ? false : true))
    );
}
