import { Component, Input, Inject, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss']
})
export class ImageModalComponent {

  @Input() id:number;
  comments:any=[];
  currentPhotoComments;
  activeSlideIndex;
  commentFb = new FormGroup({
    comment: new FormControl(),
    name: new FormControl(),
    email: new FormControl()
  })

  constructor(
    public dialogRef: MatDialogRef<ImageModalComponent>,
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

  onSubmit() {

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
