import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-full-events',
  templateUrl: './full-events.component.html',
  styleUrls: ['./full-events.component.scss']
})
export class FullEventsComponent implements OnInit {

  constructor(  
    private API: HttpService, 
    private activatedRouter: ActivatedRoute,
    private location:Location,
    private sanitizer: DomSanitizer
  ) { 
    this.activatedRouter.params.subscribe(param => {
      this.id = param.id;
    });
  }

  OtherEvents: any = [{}];

  htmlData;
  id: number;
  event:any = {
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

  async getOtherEvents() {
    this.OtherEvents = await this.API.getEvents();
  }

  async getEvent(){
    this.event = await this.API.getEventById(this.id);
  }

  ngOnInit() {
    this.getEvent().then(()=>{
      this.htmlData = this.sanitizer.bypassSecurityTrustHtml(this.event.description);
      console.log(this.event);
    })
    this.getOtherEvents().then(async () => {
      console.log(this.OtherEvents)
    })
  }

  goBack(){
    this.location.back();
  }

}
