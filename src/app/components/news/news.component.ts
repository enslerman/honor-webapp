import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  constructor(  
    private API: HttpService,
    private sanitizer: DomSanitizer
  ) { }

  id: number;
  news:any=[{id:"0"}];
  htmlData;

  async getPosts(){
    this.news = await this.API.getNews()
  }

  ngOnInit() {
    this.getPosts().then(()=>{
      this.htmlData=this.sanitizer.bypassSecurityTrustHtml(this.news[0].description);
      console.log(this.news);
    })
  }

}
