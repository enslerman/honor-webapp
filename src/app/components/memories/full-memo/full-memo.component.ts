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
    let p=this.API.getAll(`{getById(id: ${this.id}, type: 3) {
      id 
      title 
      title_image 
      description 
      time 
      author
      comments{
        nickname
        description
        time
        active
      }}}`).toPromise();
      let res =await p;
      this.memo = res.data;
      this.comments=this.memo.getById.comments;
      for (let comment of this.comments) {
        let date=new Date(comment.time);
        let dateNew=this.prepareDate(date);
        comment.time=`${dateNew.day} ${dateNew.month} ${dateNew.year} года`;
      }
      this.memo = this.memo.getById;
      this.htmlData = this.sanitizer.bypassSecurityTrustHtml(this.memo.description);
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

  getOtherMemo() {
    this.API.getAll('{getAll(page: 1, count: 8, type: 3) {id title title_image}}').subscribe(res => {
      this.OtherMemo = res.data
      this.OtherMemo = this.OtherMemo.getAll
    })
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
