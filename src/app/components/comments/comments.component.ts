import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {
  comment="";
  name="";
  error=false;
  constructor(
    private API: HttpService,
    public dialogRef: MatDialogRef<CommentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  
  onNoClick(): void {
    console.log(this.data);
    this.dialogRef.close();
  }

  async send(){
    console.log(this.data);
    if(this.comment!==""&&this.name!==""){
      let comment={
        "nickname":this.name,
        "description":this.comment
      }
      let res=await this.API.postComment(this.data.component,comment,this.data.id);
      if(res!="success"){
        this.error=true;
      }
      else{
        this.dialogRef.close();
      }
    }
    // this.
  }

}
