import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

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
  ) { 
    this.activatedRouter.params.subscribe(param => {
      console.log(param);
      this.id = param.id;
    });
  }
  htmlData;

  id: number;
  news:any = {
    "author": "",
    "description": "",
    "id": "",
    "time": "",
    "title": "",
    "title_image": ""
  };
  OtherNews: any = [{}];

  async getNews(){
    this.news = await this.API.getNewsById(this.id);
  }

  async getOtherNews() {
    this.OtherNews = await this.API.getNews();
  }

  ngOnInit() {
    this.getNews().then(()=>{
      this.htmlData=this.sanitizer.bypassSecurityTrustHtml(this.news.description);
      console.log(this.news);
    })
    this.getOtherNews().then(async () => {
      console.log(this.OtherNews)
    })
  }

  goBack(){
    this.location.back();
  }

  routerLink(id) {
    console.log(id)
    this.id = id;
    this.router.navigateByUrl(`/news/${id}`);
    this.getNews().then(()=>{
      this.htmlData=this.sanitizer.bypassSecurityTrustHtml(this.news.description);
      console.log(this.news);
    })
  }

}
