import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
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
  ) { }

  id: number;
  news:any=[{id:"0"}];
  size: any;
  lenght: any;
  pagination: any;
  pageEvent: PageEvent;
  
  getPosts(page: any){
    this.API.getAll(`{getAll(page: ${page}, count: null, type: 4) {id title title_image_mini description_short}}`).subscribe(res => {
      this.news = res.data
      this.news = this.news.getAll
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
    })
  }

  changePage(event) {
    this.getPosts(event.pageIndex + 1)
  }

  ngOnInit() {
    this.getPage()
    this.getPosts(1)
  }

}
