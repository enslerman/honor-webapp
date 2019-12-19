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
    this.events = await this.API.getEvents()
  }

  ngOnInit() {
    this.getEvents().then(()=>{
      for (let item of this.events) {
        item.description = this.sanitizer.bypassSecurityTrustHtml(item.description.replace(new RegExp("<p[^>]*>","g"),"").replace(new RegExp("</p[^>]*>","g"),"").substring(0, 180) + `...`)
      }
      console.log(this.events);
    })
  }

}
