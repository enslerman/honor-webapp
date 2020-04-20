import { Component, OnInit, Inject } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommentsComponent } from '../../comments/comments.component';

@Component({
  selector: 'app-full-news',
  templateUrl: './full-news.component.html',
  styleUrls: ['./full-news.component.scss']
})
export class FullNewsComponent implements OnInit {

  constructor(  
    private API: HttpService, 
    private activatedRouter: ActivatedRoute,
    private location:Location,
    private sanitizer: DomSanitizer,
    private router: Router,
    public dialog: MatDialog
  ) { 
    this.activatedRouter.params.subscribe(param => {
      // console.log(param);
      this.id = param.id;
    });
  }
  htmlData;
  comments=[];
  id: number;
  news:any = {};
  OtherNews: any = [{}];

  openDialog(): void {
    const dialogRef = this.dialog.open(CommentsComponent, {
      width: '300px',
      data: {
        "component":"news",
        "id":this.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

   async getNews(){
      let p=this.API.getAll(`{getById(id: ${this.id}, type: 4) {
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
      console.log(res);
      this.news = res.data;
      this.comments=this.news.getById.comments;
      for (let comment of this.comments) {
        let date=new Date(comment.time);
        let dateNew=this.prepareDate(date);
        comment.time=`${dateNew.day} ${dateNew.month} ${dateNew.year} года`;
      }
      this.news = this.news.getById;
      this.htmlData = this.sanitizer.bypassSecurityTrustHtml(this.news.description);
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

  getOtherNews() {
    this.API.getAll('{getAll(page: 1, count: 8, type: 4) {id title title_image}}').subscribe(res => {
      this.OtherNews = res.data
      this.OtherNews = this.OtherNews.getAll
    })
  }

  ngOnInit() {
    this.getNews()
    this.getOtherNews()
  }

  goBack(){
    this.location.back();
  }

  routerLink(id) {
    this.id = id;
    this.router.navigateByUrl(`/news/${id}`);
    this.getNews()
  }

}