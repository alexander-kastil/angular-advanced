import { AsyncPipe, NgStyle } from '@angular/common';
import { Component, DestroyRef, OnInit, ChangeDetectionStrategy, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { LoadingService } from '../../shared/loading/loading.service';
import { EditorContainerComponent } from '../../shared/markdown-editor/components/editor-container/editor-container.component';
import { SidePanelComponent } from '../../shared/side-panel/side-panel.component';
import { SidebarActions } from '../../shared/side-panel/sidebar.actions';
import { SidePanelService } from '../../shared/side-panel/sidepanel.service';
import { SideNavService } from '../../shared/sidenav/sidenav.service';
import { DemoFacade } from '../state/demo.facade';

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
    LoadingComponent,
    RouterOutlet,
    EditorContainerComponent,
    SidePanelComponent,
    AsyncPipe,
  ],
  // TODO: This component has been partially migrated to be zoneless-compatible.
  // After testing, this should be updated to ChangeDetectionStrategy.OnPush.
  changeDetection: ChangeDetectionStrategy.Default
})
export class DemoContainerComponent implements OnInit {
  destroyRef = inject(DestroyRef);
  router = inject(Router);
  route = inject(ActivatedRoute);
  df = inject(DemoFacade);
  nav = inject(SideNavService);
  ls = inject(LoadingService);
  eb = inject(SidePanelService);

  readonly title = signal(environment.title);
  readonly header = signal('Please select a demo');
  readonly demos = this.df.getDemos();

  readonly isLoading = signal(false);

  readonly sidenavMode = this.nav.getSideNavPosition();
  readonly sidenavVisible = this.nav.getSideNavVisible();
  readonly workbenchMargin = computed(() => this.sidenavVisible() ? { 'margin-left': '5px' } : { 'margin-left': '0px' });
  readonly currentCMD = this.eb.getCommands();
  readonly showMdEditor = computed(() => this.currentCMD() !== SidebarActions.HIDE_MARKDOWN);

  constructor() {
    this.ls.getLoading().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      this.isLoading.set(value);
    });
  }

  ngOnInit() {
    this.df.init();
    this.setComponentMetadata();
  }

  rootRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  setComponentMetadata() {
    this.router.events.pipe(
      takeUntilDestroyed(this.destroyRef),
      filter((event) => event instanceof NavigationEnd),
      map(() => this.rootRoute(this.route)),
      filter((route: ActivatedRoute) => route.outlet === 'primary')
    )
      .subscribe((route: ActivatedRoute) => {
        this.header.set(
          route.component != null
            ? `Component: ${route.component
              .toString()
              .substring(7, route.component.toString().indexOf('{') - 1)}`
            : ''
        );
      });
  }
}
