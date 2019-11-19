import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import * as screenfull from 'screenfull';

@Component({
  selector: 'app-full-gallery',
  templateUrl: './full-gallery.component.html',
  styleUrls: ['./full-gallery.component.scss']
})
export class FullGalleryComponent implements OnInit {

  constructor(  
    private API: HttpService, 
    private activatedRouter: ActivatedRoute,
    private location:Location
  ) { 
    this.activatedRouter.params.subscribe(param => {
      this.id = param.id;
    });
  }

  id: number;
  album: any = [];
  images: any;

  async getAlbum(){
    this.album = await this.API.getAlbumById(this.id);
    this.images = this.album.images;
  }

  ngOnInit() {
    this.getAlbum().then(()=>{
      console.log(this.album);
      console.log(this.images);
    })
  }

  goBack(){
    this.location.back();
  }

  openPic() {
    if (screenfull.isEnabled) {
      screenfull.request();
    }
  }

}
