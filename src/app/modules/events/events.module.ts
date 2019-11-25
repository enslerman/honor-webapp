import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { EventsComponent } from 'src/app/components/events/events.component';
import { FullEventsComponent } from 'src/app/components/events/full-events/full-events.component';
import { MatCardModule } from '@angular/material/card';
import { BackButtonComponent } from 'src/app/components/back-button/back-button.component';
import { GalleryModule } from '../gallery/gallery.module';


@NgModule({
  imports: [
    CommonModule,
    EventsRoutingModule,
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
  declarations: [EventsComponent,FullEventsComponent],
})
export class EventsModule { }
