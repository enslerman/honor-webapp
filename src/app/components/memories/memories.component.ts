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
  size: any;
  lenght: any;
  pagination: any;
  pageEvent: PageEvent;

  getPosts(page: any){
    this.API.getAll(`{getAll(page: ${page}, count: null, type: 3) {id title title_image_mini description_short}}`).subscribe(res => {
      this.memo = res.data
      this.memo = this.memo.getAll
    })
  }

  getPage() {
    this.API.getAll(`
    {
      getCount(type: 3) {
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
