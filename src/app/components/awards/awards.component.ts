import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.scss']
})
export class AwardsComponent implements OnInit {

  constructor(  
    private API: HttpService,
  ) { }

  id: number;
  awards: any = [{
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
    description: "",
    id: 0,
    name: "",
    small_description: "",
    veterans: []
  }];

  async getAwards(){
    this.awards = await this.API.getAwards()
  }

  ngOnInit() {
    this.getAwards().then(()=>{
      console.log(this.awards);
    })
  }

}
