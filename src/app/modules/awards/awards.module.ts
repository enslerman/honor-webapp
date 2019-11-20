import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AwardsRoutingModule } from './awards-routing.module';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { AwardsComponent } from 'src/app/components/awards/awards.component';
import { FullAwardsComponent } from 'src/app/components/full-awards/full-awards.component';
import { MatCardModule } from '@angular/material/card';
import { BackButtonComponent } from 'src/app/components/back-button/back-button.component';
import { GalleryModule } from '../gallery/gallery.module';


@NgModule({
  imports: [
    CommonModule,
    AwardsRoutingModule,
    MatSliderModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MDBBootstrapModule.forRoot(),
    NgxSpinnerModule,
    SlickCarouselModule,
    MatCardModule,
    GalleryModule
  ],
  declarations: [AwardsComponent,FullAwardsComponent],
})
export class AwardsModule { }
