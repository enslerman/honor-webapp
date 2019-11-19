import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-full-memo',
  templateUrl: './full-memo.component.html',
  styleUrls: ['./full-memo.component.scss']
})
export class FullMemoComponent implements OnInit {

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
  memo:any = {
    id: "",
    "title": "",
    "description": "",
    "image": ""
  };

  async getMemo(){
    this.memo = await this.API.getPostById(this.id);
  }

  ngOnInit() {
    this.getMemo().then(()=>{
      console.log(this.memo);
    })
  }

  goBack(){
    this.location.back();
  }

}
