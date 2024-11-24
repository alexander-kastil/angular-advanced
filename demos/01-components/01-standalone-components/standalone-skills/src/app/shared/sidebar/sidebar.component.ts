import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    imports: [RouterLink],
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  items: { title: string, url: string }[] = [
    { title: 'Home', url: '' },
    { title: 'Skills', url: 'skills' }
  ];

}
