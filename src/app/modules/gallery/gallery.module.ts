import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryRoutingModule } from './gallery-routing.module';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { GalleryComponent } from 'src/app/components/gallery/gallery.component';
import { FullGalleryComponent } from 'src/app/components/full-gallery/full-gallery.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ImageModalComponent } from 'src/app/components/full-gallery/image-modal/image-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { BackButtonComponent } from 'src/app/components/back-button/back-button.component';
import {MatGridListModule} from '@angular/material/grid-list';




@NgModule({
  declarations: [
    GalleryComponent, FullGalleryComponent, ImageModalComponent, BackButtonComponent
  ],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    MatSliderModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MDBBootstrapModule.forRoot(),
    NgxSpinnerModule,
    SlickCarouselModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCardModule,
    MatGridListModule
  ],
  exports: [BackButtonComponent],
  entryComponents: [ImageModalComponent]
})
export class GalleryModule { }
