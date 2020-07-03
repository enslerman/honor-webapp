import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  constructor(  
    private API: HttpService,
  ) { }

  id: number;
  albums: any = [];
  preview: any;

  async getAlbums(){
    let data:any = await this.API.getGallery(0,10)
    this.albums = data.content;
  }

  ngOnInit() {
    this.getAlbums()
  }


}
