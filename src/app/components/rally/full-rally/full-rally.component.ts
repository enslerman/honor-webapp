import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { CommentsComponent } from '../../comments/comments.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-full-rally',
  templateUrl: './full-rally.component.html',
  styleUrls: ['./full-rally.component.scss']
})
export class FullRallyComponent implements OnInit {

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

  id: number;
  comments: any[];
  htmlData;
  commentFb = new FormGroup({
    description: new FormControl(),
    nickname: new FormControl()
  });

  OtherRally: any = [{}];
  rally:any = {};
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

  async getEvent(){
    let data:any = await this.API.getPostById(this.id);
    this.rally = data;
    this.rally.time = this.prettyTime(this.rally.time)
     
    this.htmlData = this.sanitizer.bypassSecurityTrustHtml(this.rally.description);
     
    this.comments = this.rally.comments;
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

  async getOtherRally() {
    let data:any = await this.API.getPostsByType(0,4,"RALLY")
    this.OtherRally = data.content;
    this.OtherRally.forEach(news => {
      news.time = this.prettyTime(news.time)
    });
  }

  ngOnInit() {
    this.getEvent()
    this.getOtherRally()
  }

  onSubmit() {
    //this.API.postRallyComment()
  }

  goBack(){
    this.location.back();
  }

  routerLink(id) {
    console.log(id)
    this.id = id;
    this.router.navigateByUrl(`/rally/${id}`);
    this.getEvent()
  }

}
