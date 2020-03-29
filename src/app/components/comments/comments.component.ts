import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {

  constructor(
    public dialogRef: MatDialogRef<CommentsComponent>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
