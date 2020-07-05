import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-memories',
  templateUrl: './memories.component.html',
  styleUrls: ['./memories.component.scss']
})
export class MemoriesComponent implements OnInit {

  constructor( 
    private API: HttpService,
    private activatedRouter: ActivatedRoute,
    private sanitizer: DomSanitizer,
  ) {
    this.activatedRouter.params.subscribe(param => {
      this.id = param.id;
    });
  }

  id: number;
  memo: any;
  pageSizeOptions = ["12","24","36"]
  lenght: any;
  currentPageNumber: any;

  pageEvent: PageEvent;

  async getPosts(page: any,size){
    let data:any = await this.API.getPostsByType(page,size,"MEMO")
    console.log(page);
  
    this.memo = data.content;
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
