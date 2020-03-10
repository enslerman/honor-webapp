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
  events:any=[{
    id:"0",
    album: {
      images: [{
        id: 0,
        name: "",
        server_path: "",
        url: ""
      }]
    }
  }];
  size: any;
  lenght: any;
  pagination: any;
  pageEvent: PageEvent;

  async getEvents(page: any){
    this.API.getAll(`{getAll(page: ${page}, count: null, type: 2) {id title title_image_mini description_short}}`).subscribe(res => {
      this.events = res.data
      this.events = this.events.getAll
    })
  }

  getPage() {
    this.API.getAll(`
    {
      getCount(type: 2) {
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
    this.getEvents(event.pageIndex + 1)
  }

  ngOnInit() {
    this.getPage()
    this.getEvents(1)
  }

}
