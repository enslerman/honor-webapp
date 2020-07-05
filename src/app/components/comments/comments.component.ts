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
    let form = new FormData();
    form.append("id",this.data.id)
    form.append("text",this.comment)
    form.append("nickname",this.name)
    let res:any = await this.API.newComment(form)
    if(res.text){
      this.dialogRef.close();
    }else{
      this.error = true;
    }
  }

}
