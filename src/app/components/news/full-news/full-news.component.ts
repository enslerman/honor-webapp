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
     let data:any = await this.API.getPostById(this.id);
     this.news = data;
     this.news.time = this.prettyTime(this.news.time)
     
      this.htmlData = this.sanitizer.bypassSecurityTrustHtml(this.news.description);
     
      this.comments = this.news.comments;
      for (let comment of this.comments) {
        comment.time=this.prettyTime(comment.time);
      }
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

  async getOtherNews() {
    let data:any = await this.API.getPostsByType(0,4,"NEWS")
    this.OtherNews = data.content;
    this.OtherNews.forEach(news => {
      news.time = this.prettyTime(news.time)
    });
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