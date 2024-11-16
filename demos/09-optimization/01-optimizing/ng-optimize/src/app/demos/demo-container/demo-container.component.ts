import { NgStyle } from '@angular/common';
import { Component, DestroyRef, OnInit, computed, inject } from '@angular/core';
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
import { SidePanelService } from '../../shared/side-panel/sidepanel.service';
import { SideNavService } from '../../shared/sidenav/sidenav.service';
import { demoStore } from '../demo.store';

@Component({
  selector: 'app-demo-container',
  templateUrl: './demo-container.component.html',
  styleUrls: ['./demo-container.component.scss'],
  standalone: true,
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
    SidePanelComponent
  ],
  providers: [demoStore]
})
export class DemoContainerComponent implements OnInit {
  destroyRef = inject(DestroyRef);
  router = inject(Router);
  route = inject(ActivatedRoute);
  store = inject(demoStore);
  sideNav = inject(SideNavService);
  ls = inject(LoadingService);
  sidePanel = inject(SidePanelService);

  title: string = environment.title;
  header = 'Please select a demo';
  demos = this.store.entities;

  isLoading = false;

  sidenavMode = this.sideNav.getSideNavPosition();
  sidenavVisible = this.sideNav.getSideNavVisible();
  workbenchMargin = computed(() => this.sidenavVisible() ? { 'margin-left': '5px' } : { 'margin-left': '0px' });
  showMdEditor = this.sidePanel.getEditorVisible();

  constructor() {
    this.ls.getLoading().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      Promise.resolve(null).then(() => { this.isLoading = value });
    });
  }

  ngOnInit() {
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
        this.header =
          route.component != null
            ? `Component: ${route.component
              .toString()
              .substring(7, route.component.toString().indexOf('{') - 1)}`
            : '';
      });
  }
}
