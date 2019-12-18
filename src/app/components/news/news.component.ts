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
  htmlData;
  cols: any;
  colspan: any;
  rowspan: any;
  public wh: any;
  public ht: any; 

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.adaptiveGrid()
  } 
  
  adaptiveGrid(){
    this.ht = window.innerHeight;
    this.wh = window.innerWidth;   
    if (this.ht > this.wh) {
      this.colspan = 1;
      this.rowspan = 1;
      this.cols = 1;
    } else {
      this.cols = 4;
    }
  }

  async getPosts(){
    this.news = await this.API.getNews()
  }

  ngOnInit() {
    this.adaptiveGrid();
    this.getPosts().then(()=>{
      this.htmlData=this.sanitizer.bypassSecurityTrustHtml(this.news[0].description);
      console.log(this.news);
    })
  }

}
