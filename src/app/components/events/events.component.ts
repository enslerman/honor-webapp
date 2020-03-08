import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { DomSanitizer } from '@angular/platform-browser';

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

  async getEvents(){
    this.API.getAll('{getAll(page: 1, count: 8, type: 2) {id title title_image description}}').subscribe(res => {
      this.events = res.data
      this.events = this.events.getAll
      for (let item of this.events) {
        item.description = this.sanitizer.bypassSecurityTrustHtml(item.description.replace(new RegExp("<p[^>]*>","g"),"").replace(new RegExp("</p[^>]*>","g"),"").substring(0, 250) + `...`)
      }
    })
    console.log(this.events)
  }

  ngOnInit() {
    this.getEvents()
  }

}
