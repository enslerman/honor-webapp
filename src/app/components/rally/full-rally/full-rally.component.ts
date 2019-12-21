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

  rally:any = {
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
    this.rally = await this.API.getEventById(this.id);
    this.comments = this.rally.comments;
  }

  async getOtherRally() {
    this.OtherRally = await this.API.getRally();
  }

  ngOnInit() {
    this.getEvent().then(()=>{
      console.log(this.rally);
      this.htmlData = this.sanitizer.bypassSecurityTrustHtml(this.rally.description);
      console.log(this.comments);
    })
    this.getOtherRally().then(async () => {
      console.log(this.OtherRally)
    })
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
    this.getEvent().then(()=>{
      console.log(this.rally);
      this.htmlData = this.sanitizer.bypassSecurityTrustHtml(this.rally.description);
      console.log(this.comments);
    })
  }

}
