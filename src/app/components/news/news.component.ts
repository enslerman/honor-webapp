import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  constructor(  
    private API: HttpService,
  ) { }

  id: number;
  news: any = [];

  async getPosts(id){
    this.news = await this.API.getMain()
  }

  ngOnInit() {
    this.getPosts(this.id).then(()=>{
      console.log(this.news);
    })
  }

}
