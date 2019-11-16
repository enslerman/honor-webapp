import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-full-events',
  templateUrl: './full-events.component.html',
  styleUrls: ['./full-events.component.scss']
})
export class FullEventsComponent implements OnInit {

  constructor(  
    private API: HttpService, 
    private activatedRouter: ActivatedRoute,
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

}
