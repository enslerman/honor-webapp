import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-full-news',
  templateUrl: './full-news.component.html',
  styleUrls: ['./full-news.component.scss']
})
export class FullNewsComponent implements OnInit {

  constructor(  
    private API: HttpService, 
    private activatedRouter: ActivatedRoute,
  ) { 
    this.activatedRouter.params.subscribe(param => {
      this.id = param.id;
    });
  }

  id: number;
  news:any = {
    "author": "",
    "description": "",
    "id": "",
    "time": "",
    "title": "",
    "title_image": ""
  };

  async getNews(){
    this.news = await this.API.getNewsById(this.id);
  }

  ngOnInit() {
    this.getNews().then(()=>{
      console.log(this.news);
    })
  }

}
