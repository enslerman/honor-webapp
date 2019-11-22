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
  imageIndex;
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

  goScreenFull(){
    
  }
  goBack(){
    this.location.back();
  }

  openDialog(id): void {
    console.log("open");
    this.imageIndex=id;
    let dialogRef = this.dialog.open(ImageModalComponent, {
      height:"43rem",
      minWidth:"53rem",
      data: {
        id:id, 
        albumId:this.id,
        images:this.images
      }
    });
    const sub = dialogRef.componentInstance.rerender.subscribe((resolve) => {
      console.log("rerender");
      this.getAlbum().then(()=>{
        dialogRef.componentInstance.setComments(this.images[resolve].comments,resolve);
      });
    });
  }

}
