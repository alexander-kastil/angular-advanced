import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { LoadingComponent } from './loading/loading.component';

const comps = [
  NavbarComponent,
  SidePanelComponent,
  LoadingComponent
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        MaterialModule,
        NgOptimizedImage,
        ...comps,
    ],
    exports: comps,
})
export class SharedModule { }
