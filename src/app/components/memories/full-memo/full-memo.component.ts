import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-full-memo',
  templateUrl: './full-memo.component.html',
  styleUrls: ['./full-memo.component.scss']
})
export class FullMemoComponent implements OnInit {

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
  htmlData;

  id: number;
  memo:any = {
    id: "",
    "title": "",
    "description": "",
    "image": ""
  };
  OtherMemo: any = [{}];

  async getMemo(){
    this.memo = await this.API.getPostById(this.id);
  }

  async getOtherMemo() {
    this.OtherMemo = await this.API.getMain();
  }

  ngOnInit() {
    this.getMemo().then(()=>{
      this.htmlData=this.sanitizer.bypassSecurityTrustHtml(this.memo.description);
      console.log(this.memo);
    })
    this.getOtherMemo().then(async () => {
      console.log(this.OtherMemo)
    })
  }

  goBack(){
    this.location.back();
  }

}
