import { ChangeDetectionStrategy, Component, computed, effect, inject, signal, resource } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { SidebarActions } from '../../shared/side-panel/sidebar.actions';
import { SidePanelService } from '../../shared/side-panel/sidepanel.service';
import { environment } from '../../../environments/environment';
import { LoadingService } from '../../shared/loading/loading.service';
import { SideNavService } from '../../shared/sidenav/sidenav.service';
import { DemoItem } from './demo-item.model';
import { SidePanelComponent } from '../../shared/side-panel/side-panel.component';
import { MarkdownEditorComponent } from '../../shared/markdown-editor/markdown-editor.component';
import { MatNavList, MatListItem } from '@angular/material/list';
import { MatTooltip } from '@angular/material/tooltip';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatSidenavContainer, MatSidenav, MatSidenavContent } from '@angular/material/sidenav';

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
    MatTooltip,
    RouterLink,
    MatSidenavContent,
    RouterOutlet,
    MarkdownEditorComponent,
    SidePanelComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoContainerComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  http = inject(HttpClient);
  nav = inject(SideNavService);
  ls = inject(LoadingService);
  eb = inject(SidePanelService);

  title: string = environment.title;

  demosResource = resource({
    loader: () => lastValueFrom(this.http.get<DemoItem[]>(`${environment.api}demos`))
  });

  demosSorted = computed(() => {
    const items = this.demosResource.value() ?? [];
    return [...items].sort((a, b) => a.sortOrder - b.sortOrder);
  });

  demos = computed(() => this.demosSorted());
  isLoadingDemos = computed(() => this.demosResource.status() === 'loading');
  hasErrorDemos = computed(() => this.demosResource.status() === 'error');

  sidenavMode = this.nav.getSideNavPosition();
  sidenavVisible = this.nav.getSideNavVisible();
  isLoading = this.ls.getLoading();

  header = signal('Please select a demo');

  showMdEditor = computed(() =>
    this.eb.getCommands()() === SidebarActions.SHOW_MARKDOWN
  );

  constructor() {
    effect(() => {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          const rootRoute = this.getRootRoute(this.route);
          if (rootRoute.outlet === 'primary' && rootRoute.component != null) {
            this.header.set(`Component: ${rootRoute.component.name}`);
          }
        }
      });
    }, { allowSignalWrites: true });
  }

  private getRootRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }
}
