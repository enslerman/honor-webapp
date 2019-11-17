import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-full-rally',
  templateUrl: './full-rally.component.html',
  styleUrls: ['./full-rally.component.scss']
})
export class FullRallyComponent implements OnInit {

  constructor(  
    private API: HttpService, 
    private activatedRouter: ActivatedRoute,
  ) { 
    this.activatedRouter.params.subscribe(param => {
      this.id = param.id;
    });
  }

  id: number;
  rally:any = {
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
    this.rally = await this.API.getEventById(this.id);
  }

  ngOnInit() {
    this.getEvent().then(()=>{
      console.log(this.rally);
    })
  }

}
