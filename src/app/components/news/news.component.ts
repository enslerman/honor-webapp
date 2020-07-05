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

  pageSizeOptions = ["12","24","36"]
  lenght: any;
  currentPageNumber: any;

  pageEvent: PageEvent;
  
  async getPosts(page: any,size:any){
    let data:any = await this.API.getPostsByType(page,size,"NEWS")
    console.log(page);
  
    this.news = data.content;
    this.lenght = data?.totalPages*data.content.length;
    this.currentPageNumber=data?.pageNumber
  }

  changePage(event) {
    this.getPosts(event.pageIndex,event.pageSize)
  }

  ngOnInit() {
    this.getPosts(0,12)
  }

}
