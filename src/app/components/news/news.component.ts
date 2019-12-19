import { Component, OnInit, HostListener } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { DomSanitizer } from '@angular/platform-browser';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

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


  async getPosts(){
    this.news = await this.API.getNews()
  }

  ngOnInit() {
    this.getPosts().then(()=>{
      for (let item of this.news) {
        item.description = this.sanitizer.bypassSecurityTrustHtml(item.description.replace(new RegExp("<p[^>]*>","g"),"").replace(new RegExp("</p[^>]*>","g"),"").substring(0, 250) + `...`)
      }
      console.log(this.news);
    })
  }

}
