import { Component, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss']
})
export class ImageModalComponent {

  @Input() id:number;
  comments:any=[];
  currentPhotoComments;

  constructor(
    public dialogRef: MatDialogRef<ImageModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(this.data)
    data.images.forEach(image => {
      this.comments.push(image.comments)
    });
    this.currentPhotoComments=this.comments[data.id];
    console.log(this.currentPhotoComments);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
