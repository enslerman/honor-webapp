import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

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
  // news: any = [];
  news:any = {
    "author": "",
    "description": "",
    "id": "",
    "time": "",
    "title": "",
    "title_image": ""
  };

  async getPosts(){
    this.news = await this.API.getNews()
  }

  ngOnInit() {
    this.getPosts().then(()=>{
      console.log(this.news);
    })
  }

}
