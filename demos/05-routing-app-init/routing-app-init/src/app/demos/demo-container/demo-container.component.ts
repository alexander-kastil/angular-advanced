import { AsyncPipe, NgStyle } from '@angular/common';
import { Component, DestroyRef, OnInit, effect, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { LoadingService } from '../../shared/loading/loading.service';
import { EditorContainerComponent } from '../../shared/markdown-editor/components/editor-container/editor-container.component';
import { SidePanelComponent } from '../../shared/side-panel/side-panel.component';
import { SidebarActions } from '../../shared/side-panel/sidebar.actions';
import { SidePanelService } from '../../shared/side-panel/sidepanel.service';
import { SideNavFacade } from '../../state/sidenav.facade';
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
    ]
})
export class DemoContainerComponent implements OnInit {
  destroyRef = inject(DestroyRef);
  router = inject(Router);
  route = inject(ActivatedRoute);
  df = inject(DemoFacade);
  nav = inject(SideNavFacade);
  ls = inject(LoadingService);
  eb = inject(SidePanelService);

  title: string = environment.title;
  demos = this.df.getDemos();
  header = this.router.events
    .pipe(
      takeUntilDestroyed(this.destroyRef),
      filter((event) => event instanceof NavigationEnd),
      map(() => this.rootRoute(this.route)),
      filter((route: ActivatedRoute) => route.outlet === 'primary'),
      map((route: ActivatedRoute) => route.component != null
        ? `Component: ${route.component.name.substring(1)}`
        : 'Please select a demo'),
      tap((header) => console.log(header)
      ));

  isLoading = false;

  sidenavMode = this.nav.getSideNavPosition();
  sidenavVisible = this.nav.getSideNavVisible();
  workbenchMargin = this.sidenavVisible.pipe(
    map(visible => { return visible ? { 'margin-left': '5px' } : {} })
  );

  currentCMD = this.eb.getCommands();
  showMdEditor: boolean = false;

  constructor() {
    effect(() => {
      this.showMdEditor = this.currentCMD() === SidebarActions.HIDE_MARKDOWN ? false : true;
    });

    this.ls.getLoading().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      Promise.resolve(null).then(() => { this.isLoading = value });
    });
  }

  ngOnInit() {
    this.df.init();
  }

  rootRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }
}
