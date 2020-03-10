import { Component, Input, Inject, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss']
})
export class ImageModalComponent {

  @Input() id:number;
  @Output() rerender=new EventEmitter<number>();
  comments:any=[];
  currentPhotoComments;
  activeSlideIndex;
  commentFb = new FormGroup({
    comment: new FormControl(),
    nickname: new FormControl(),
    email: new FormControl()
  })

  constructor(
    public dialogRef: MatDialogRef<ImageModalComponent>,
    private API: HttpService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(this.data);
    this.loadComments(data.id);
    console.log(this.currentPhotoComments);
  }


  loadComments(id){
    this.comments=[];
    this.activeSlideIndex=id;
    this.data.images.forEach(image => {
      this.comments.push(image.comments)
    });
    this.currentPhotoComments=this.comments[id];
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  setComments(comments:any,index:number){
    this.currentPhotoComments=comments;
    this.data.images[index].comments=comments;
    console.log(this.currentPhotoComments);
  }

  onSubmit(carousel) {
    console.log(this.commentFb.value);
    console.log(this.data.images[carousel._currentActiveSlide]);
    this.API.postGalleryComment(this.commentFb.value,this.data.images[carousel._currentActiveSlide].id)
    .then(resolve=>{
      console.log(resolve);
      this.rerender.emit(carousel._currentActiveSlide);
    },reject=>{
      console.log(reject);
    })
  }
  
  previousSlide(carousel){
    carousel.previousSlide();
    let id=carousel._currentActiveSlide;
    this.loadComments(id);
  }
  
  nextSlide(carousel){
    carousel.nextSlide();
    let id=carousel._currentActiveSlide;
    this.loadComments(id);
  }

}
