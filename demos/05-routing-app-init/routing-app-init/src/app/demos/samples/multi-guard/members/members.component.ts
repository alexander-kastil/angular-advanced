import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

@Component({
    selector: 'app-members',
    templateUrl: './members.component.html',
    styleUrls: ['./members.component.scss'],
    standalone: true,
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent]
})
export class MembersComponent {

}
