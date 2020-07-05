import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  constructor(  
    private API: HttpService,
    private sanitizer: DomSanitizer,
  ) { }

  id: number;
  events:any;
  
  pageSizeOptions = ["12","24","36"]
  lenght: any;
  currentPageNumber: any;

  pageEvent: PageEvent;

  async getPosts(page: any,size:any){
    let data:any = await this.API.getPostsByType(page,size,"EVENTS")
    console.log(page);
  
    this.events = data.content;
    this.lenght = data?.totalPages*data.content.length;
    this.currentPageNumber=data?.pageNumber
  }

  changePage(event) {
    this.getPosts(event.pageIndex ,event.pageSize)
  }

  ngOnInit() {
    this.getPosts(0,12)
  }

}
