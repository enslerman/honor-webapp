import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsRoutingModule } from './news-routing.module';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NewsComponent } from 'src/app/components/news/news.component';
import { FullNewsComponent } from 'src/app/components/full-news/full-news.component';



@NgModule({
  declarations: [
    NewsComponent, FullNewsComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    MatSliderModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MDBBootstrapModule.forRoot(),
    NgxSpinnerModule,
    SlickCarouselModule
  ]
})
export class NewsModule { }
