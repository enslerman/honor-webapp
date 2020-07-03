import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
// import { ImageModalComponent } from './image-modal/image-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Lightbox, LightboxConfig } from 'ngx-lightbox';

@Component({
  selector: 'app-full-gallery',
  templateUrl: './full-gallery.component.html',
  styleUrls: ['./full-gallery.component.scss']
})
export class FullGalleryComponent implements OnInit {

  constructor(  
    private API: HttpService, 
    private activatedRouter: ActivatedRoute,
    private location:Location,
    public dialog: MatDialog,
    private lightbox: Lightbox,
    private lightboxConfig: LightboxConfig
  ) { 
    this.activatedRouter.params.subscribe(param => {
      this.id = param.id;
    });
    lightboxConfig.centerVertically = true;
    lightboxConfig.disableScrolling = true;
  }

  id: number;
  imageIndex;
  album: any = [];
  images: any;

  async getAlbum() {
    let data:any = await this.API.getFullAlbum(this.id)
    this.images = data.images
    console.log(data);

    for (let el of this.images) {
      el["src"] = el.url
    }
      
  }

  ngOnInit() {
    this.getAlbum()
  }

  goBack(){
    this.location.back();
  }

  open(index: number): void {
    // open lightbox
    this.lightbox.open(this.images, index);
  }
 
  close(): void {
    // close lightbox programmatically
    this.lightbox.close();
  }

}
