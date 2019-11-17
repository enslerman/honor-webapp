import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  constructor(  
    private API: HttpService,
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
      console.log(this.events);
    })
  }

}
