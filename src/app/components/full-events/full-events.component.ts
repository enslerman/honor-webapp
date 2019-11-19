import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-full-events',
  templateUrl: './full-events.component.html',
  styleUrls: ['./full-events.component.scss']
})
export class FullEventsComponent implements OnInit {

  constructor(  
    private API: HttpService, 
    private activatedRouter: ActivatedRoute,
    private location:Location
  ) { 
    this.activatedRouter.params.subscribe(param => {
      this.id = param.id;
    });
  }

  id: number;
  event:any = {
    album: {
      id: 0, 
      name: "", 
      images: [{
        id: 0,
        name: "",
        server_path: "",
        url: ""
      }]
    },
    author: "",
    comments: [],
    description: "",
    id: 0,
    time: "",
    title: "",
    type: {
      id: 0, 
      name: ""
    }
  };

  async getEvent(){
    this.event = await this.API.getEventById(this.id);
  }

  ngOnInit() {
    this.getEvent().then(()=>{
      console.log(this.event);
    })
  }

  goBack(){
    this.location.back();
  }

}
