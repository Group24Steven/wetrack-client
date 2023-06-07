import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { AppLayoutType } from './core/enums/app-layout.type';
import { filter, map, mergeMap } from 'rxjs/operators';
import { LayoutSidenavComponent } from './core/layouts/layout-sidenav/layout-sidenav.component';
import { LayoutCenteredComponent } from './core/layouts/layout-centered/layout-centered.component';
import { NgSwitch, NgSwitchCase, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [NgSwitch, NgSwitchCase, LayoutCenteredComponent, LayoutSidenavComponent, AsyncPipe]
})
export class AppComponent {
  layout$ = this.getLayoutType$()

  readonly AppLayoutType = AppLayoutType

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  private getLayoutType$(): Observable<AppLayoutType> {
    return this.router.events.pipe(filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route) => {
        while (route.firstChild) {
          route = route.firstChild
        }
        return route
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data),
      map(({ layout }) => layout),
    )
  }
}
