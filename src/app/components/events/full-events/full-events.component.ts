import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Router, ActivatedRoute } from '@angular/router';
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
    private sanitizer: DomSanitizer,
    private router: Router,
  ) { 
    this.activatedRouter.params.subscribe(param => {
      this.id = param.id;
    });
  }

  OtherEvents: any = [{}];

  htmlData;
  id: number;
  event:any = {};

  async getOtherEvents() {
    this.API.getAll('{getAll(page: 1, count: 8, type: 2) {id title title_image}}').subscribe(res => {
      this.OtherEvents = res.data
      this.OtherEvents = this.OtherEvents.getAll
    })
  }

  async getEvent(){
    this.API.getAll(`{getById(id: ${this.id}, type: 2) {id title title_image description time author}}`).subscribe(res => {
      this.event = res.data;
      this.event = this.event.getById;
      this.htmlData=this.sanitizer.bypassSecurityTrustHtml(this.event.description);
    })
  }

  ngOnInit() {
    this.getEvent()
    this.getOtherEvents()
  }

  goBack(){
    this.location.back();
  }

  routerLink(id) {
    console.log(id)
    this.id = id;
    this.router.navigateByUrl(`/events/${id}`);
    this.getEvent()
  }


}
