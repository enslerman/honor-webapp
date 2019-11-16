import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-full-gallery',
  templateUrl: './full-gallery.component.html',
  styleUrls: ['./full-gallery.component.scss']
})
export class FullGalleryComponent implements OnInit {

  constructor(  
    private API: HttpService, 
    private activatedRouter: ActivatedRoute,
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

}
