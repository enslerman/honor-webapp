import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { CommentsComponent } from '../../comments/comments.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-full-events',
  templateUrl: './full-events.component.html',
  styleUrls: ['./full-events.component.scss']
})
export class FullEventsComponent implements OnInit {

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

  OtherEvents: any = [{}];
  comments=[];
  htmlData;
  id: number;
  event:any = {};
  openDialog(): void {
    const dialogRef = this.dialog.open(CommentsComponent, {
      width: '300px',
      data: {
        "component":"actions",
        "id":this.id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  async getOtherEvents() {
    this.API.getAll('{getAll(page: 1, count: 8, type: 2) {id title title_image}}').subscribe(res => {
      this.OtherEvents = res.data
      this.OtherEvents = this.OtherEvents.getAll
    })
  }

  async getEvent(){
    let p=this.API.getAll(`{getById(id: ${this.id}, type: 2) {
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
      }}}`).toPromise();
      let res =await p;
      this.event = res.data;
      this.comments=this.event.getById.comments;
      for (let comment of this.comments) {
        let date=new Date(comment.time);
        let dateNew=this.prepareDate(date);
        comment.time=`${dateNew.day} ${dateNew.month} ${dateNew.year} года`;
      }
      this.event = this.event.getById;
      this.htmlData = this.sanitizer.bypassSecurityTrustHtml(this.event.description);
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

  ngOnInit() {
    this.getEvent()
    this.getOtherEvents()
  }

  goBack(){
    this.location.back();
  }

  routerLink(id) {
    console.log(id)
    this.id = id;
    this.router.navigateByUrl(`/events/${id}`);
    this.getEvent()
  }


}
