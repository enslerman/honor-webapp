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

  pageSizeOptions = ["12","24","36"]
  lenght: any;
  currentPageNumber: any;

  pageEvent: PageEvent;

  async getPosts(page: any,size:any){
    let data:any = await this.API.getPostsByType(page,size,"RALLY")
    console.log(page);
  
    this.rally = data.content;
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
