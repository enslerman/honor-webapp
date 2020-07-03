import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { CommentsComponent } from '../../comments/comments.component';

@Component({
  selector: 'app-full-memo',
  templateUrl: './full-memo.component.html',
  styleUrls: ['./full-memo.component.scss']
})
export class FullMemoComponent implements OnInit {

  constructor(  
    private API: HttpService, 
    private activatedRouter: ActivatedRoute,
    private location:Location,
    private sanitizer: DomSanitizer,
    private router: Router,
    public dialog: MatDialog
  ) { 
    this.activatedRouter.params.subscribe(param => {
      this.id = param.id;
    });
  }
  htmlData;
  comments=[];
  id: number;
  memo:any = {};
  OtherMemo: any = [{}];
  openDialog(): void {
    const dialogRef = this.dialog.open(CommentsComponent, {
      width: '300px',
      data: {
        "component":"post",
        "id":this.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  async getMemo(){
    let data:any = await this.API.getPostById(this.id);
    this.memo = data;
    this.memo.time = this.prettyTime(this.memo.time)
     
    this.htmlData = this.sanitizer.bypassSecurityTrustHtml(this.memo.description);
     
    this.comments = this.memo.comments;
    for (let comment of this.comments)
      comment.time=this.prettyTime(comment.time);
  }

  prettyTime(time){
    let date=new Date(time);
    let dateNew=this.prepareDate(date);
    return `${dateNew.day} ${dateNew.month} ${dateNew.year} года`;
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

  async getOtherMemo() {
    let data:any = await this.API.getPostsByType(0,4,"MEMO")
    this.OtherMemo = data.content;
    this.OtherMemo.forEach(news => {
      news.time = this.prettyTime(news.time)
    });
  }

  ngOnInit() {
    this.getMemo()
    this.getOtherMemo()
  }

  goBack(){
    this.location.back();
  }

  routerLink(id) {
    console.log(id)
    this.id = id;
    this.router.navigateByUrl(`/memories/${id}`);
    this.getMemo()
  }

}
