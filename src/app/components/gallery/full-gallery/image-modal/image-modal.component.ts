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
      for (let comment of image.comments) {
        console.log(comment);
        let date=new Date(comment.time);
        let dateNew=this.prepareDate(date);
        comment.time=`${dateNew.day} ${dateNew.month} ${dateNew.year} года`;
      }
      this.comments.push(image.comments);
    });
    this.currentPhotoComments=this.comments[id];
  }
  prepareDate(date:Date):any{
    let day:any=date.getDate();
    let month:any=date.getMonth();
    switch(month){
      case 1:
        month="Января"
        break;
      case 2:
        month="Февраля"
        break;
      case 3:
        month="Марта"
        break;
      case 4:
        month="Апреля"
        break;
      case 5:
        month="Мая"
        break;
      case 6:
        month="Июня"
        break;
      case 7:
        month="Июля"
        break;
      case 8:
        month="Августа"
        break;
      case 9:
        month="Сентября"
        break;
      case 10:
        month="Октября"
        break;
      case 11:
        month="Ноября"
        break;
      case 12:
        month="Декабря"
        break;
    }
    if(day<10){
      day="0"+day;
    }
    let res={
      "day":day,
      "month":month,
      "year":date.getFullYear()
    }
    return res;
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
    this.API.postComment("image",this.commentFb.value,this.data.images[carousel._currentActiveSlide].id)
    .then(resolve=>{
      if(resolve!=="Success"){
        //bad
      }
    },reject=>{
      console.log(reject);//bad
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
