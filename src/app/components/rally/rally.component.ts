import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-rally',
  templateUrl: './rally.component.html',
  styleUrls: ['./rally.component.scss']
})
export class RallyComponent implements OnInit {

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
  rally: any;
  size: any;
  lenght: any;
  pagination: any;
  pageEvent: PageEvent;

  async getPosts(page: any){
    this.API.getAll(`{getAll(page: ${page}, count: null, type: 1) {id title title_image description_short}}`).subscribe(res => {
      this.rally = res.data;
      this.rally = this.rally.getAll;
    });
  }

  getPage() {
    this.API.getAll(`
    {
      getCount(type: 1) {
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
