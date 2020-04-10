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

  id: number;
  news:any = {};
  OtherNews: any = [{}];

  openDialog(): void {
    const dialogRef = this.dialog.open(CommentsComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  getNews(){
    this.API.getAll(`{getById(id: ${this.id}, type: 4) {id title title_image description time author}}`).subscribe(res => {
      this.news = res.data;
      this.news = this.news.getById;
      this.htmlData = this.sanitizer.bypassSecurityTrustHtml(this.news.description);
    })
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