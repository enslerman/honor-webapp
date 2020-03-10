import { Component, OnInit, HostListener } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PageEvent } from '@angular/material/paginator';

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
  size: any;
  lenght: any;
  pagination: any;
  pageEvent: PageEvent;
  
  getPosts(page: any, count: any){
    this.API.getAll(`{getAll(page: ${page}, count: ${count}, type: 4) {id title title_image_mini description}}`).subscribe(res => {
      this.news = res.data
      this.news = this.news.getAll
      for (let item of this.news) {
        item.description = this.sanitizer.bypassSecurityTrustHtml(item.description.replace(new RegExp("<p[^>]*>","g"),"").replace(new RegExp("</p[^>]*>","g"),"").substring(0, 250) + `...`)
      }
    })
  }

  getPage() {
    this.API.getAll(`
    {
      getCount(type: 4) {
        size 
        count
      }
    }`).subscribe(res => {
      this.pagination = res.data
      this.pagination = this.pagination.getCount
      this.size = this.pagination.size
      this.lenght = this.pagination.count * this.size
      console.log(this.pagination)
      console.log(this.size)
      console.log(this.lenght)
    })
  }

  changePage(event) {
    this.getPosts(event.pageIndex + 1, this.size)
    console.log(event.pageIndex)
  }

  ngOnInit() {
    this.getPage()
    this.getPosts(1, this.size)
  }

}
