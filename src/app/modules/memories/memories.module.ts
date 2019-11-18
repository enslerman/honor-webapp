import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemoriesRoutingModule } from './memories-routing.module';
import { MemoriesComponent } from 'src/app/components/memories/memories.component';
import { FullMemoComponent } from 'src/app/components/full-memo/full-memo.component';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SlickCarouselModule } from 'ngx-slick-carousel';


@NgModule({
  imports: [
    CommonModule,
    MemoriesRoutingModule,
    MatSliderModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MDBBootstrapModule.forRoot(),
    NgxSpinnerModule,
    SlickCarouselModule
  ],
  declarations: [MemoriesComponent,FullMemoComponent],
})
export class MemoriesModule { }
