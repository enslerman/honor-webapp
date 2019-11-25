import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RallyRoutingModule } from './rally-routing.module';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { RallyComponent } from 'src/app/components/rally/rally.component';
import { FullRallyComponent } from 'src/app/components/rally/full-rally/full-rally.component';
import { MatCardModule } from '@angular/material/card';
import { GalleryModule } from '../gallery/gallery.module';
import { MatInputModule } from '@angular/material';



@NgModule({
  imports: [
    CommonModule,
    RallyRoutingModule,
    MatSliderModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MDBBootstrapModule.forRoot(),
    NgxSpinnerModule,
    MatInputModule,
    SlickCarouselModule,
    MatCardModule,
    GalleryModule
  ],
  declarations: [RallyComponent,FullRallyComponent],
})
export class RallyModule { }
