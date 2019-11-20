import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ImageModalComponent } from './image-modal/image-modal.component';
import { MatDialog } from '@angular/material/dialog';

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
    public dialog: MatDialog
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
      console.log(this.images[0]);
    })
  }

  goBack(){
    this.location.back();
  }

  openDialog(id): void {
    let dialogRef = this.dialog.open(ImageModalComponent, {
      width: "700px",
      //maxHeight: "",
      data: {
        id:id, 
        images:this.images
      }
    });
    console.log(id)
  }

}
