import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-full-rally',
  templateUrl: './full-rally.component.html',
  styleUrls: ['./full-rally.component.scss']
})
export class FullRallyComponent implements OnInit {

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

  id: number;
  comments: any[];
  htmlData;
  commentFb = new FormGroup({
    description: new FormControl(),
    nickname: new FormControl()
  });

  OtherRally: any = [{}];
  rally:any = {};

  getEvent(){
    this.API.getAll(`{getById(id: ${this.id}, type: 1) {id title title_image description time author}}`).subscribe(res => {
      this.rally = res.data;
      this.rally = this.rally.getById;
      this.htmlData=this.sanitizer.bypassSecurityTrustHtml(this.rally.description);
    })
  }

  getOtherRally() {
    this.API.getAll('{getAll(page: 1, count: 8, type: 1) {id title title_image}}').subscribe(res => {
    this.OtherRally = res.data
    this.OtherRally = this.OtherRally.getAll
  })
  }

  ngOnInit() {
    this.getEvent()
    this.getOtherRally()
  }

  onSubmit() {
    //this.API.postRallyComment()
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
