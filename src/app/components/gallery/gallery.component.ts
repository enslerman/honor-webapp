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
    this.API.getAll('{getAllAlbums(page: 1) {id name images(limit: 1){id url}}}').subscribe(res => {
      this.albums = res.data
      this.albums = this.albums.getAllAlbums
      console.log(this.albums)
    })
  }

  ngOnInit() {
    this.getAlbums()
  }


}
