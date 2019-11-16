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
  photos: any = [];
  preview: any;

  async getPhotos(){
    this.photos = await this.API.getAlbumById(this.id);
  }

  ngOnInit() {
    this.getPhotos().then(()=>{
      console.log(this.photos);
    })
  }

}
