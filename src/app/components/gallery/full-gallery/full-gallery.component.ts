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
    let p=this.API.getAll(`{getAlbumById(id: ${this.id}) 
    {
      id 
      name 
      images{
        id 
        url
        comments{
          nickname
          comment
          time
        }
      }
    }}`).toPromise();
      let res=await p;
      this.album = res.data
      this.album = this.album.getAlbumById
      this.images = this.album.images;
      console.log(this.images)
      // console.log(this.album)

      for await (let el of this.images) {
        el["src"] = el.url
      }
      
  }

  ngOnInit() {
    this.getAlbum()
  }

  goBack(){
    this.location.back();
  }

  // openDialog(id): void {
  //   console.log("open");
  //   this.imageIndex=id;
  //   // console.log(this.images);
  //   this.dialog.open(ImageModalComponent, {
  //     height:"43rem",
  //     minWidth:"53rem",
  //     data: {
  //       id:id, 
  //       albumId:this.id,
  //       images:this.images
  //     }
  //   });


  //   // const sub = dialogRef.componentInstance.rerender.subscribe((resolve) => {
  //   //   console.log("rerender");
  //   //   this.getAlbum().then(()=>{
  //   //     dialogRef.componentInstance.setComments(this.images[resolve].comments,resolve);
  //   //   });
  //   // });
  // }

  open(index: number): void {
    // open lightbox
    this.lightbox.open(this.images, index);
  }
 
  close(): void {
    // close lightbox programmatically
    this.lightbox.close();
  }

}
