import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-full-awards',
  templateUrl: './full-awards.component.html',
  styleUrls: ['./full-awards.component.scss']
})
export class FullAwardsComponent implements OnInit {

  constructor(  
    private API: HttpService, 
    private activatedRouter: ActivatedRoute,
    private location:Location
  ) { 
    this.activatedRouter.params.subscribe(param => {
      this.id = param.id;
    });
  }

  title_image: any;
  id: number;
  award: any = [{
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
  veterans: any;

  async getAward(){
    this.award = await this.API.getAwardById(this.id);
    this.veterans = this.award.veterans;
    this.title_image = this.award.album.images[0].url;
  }

  ngOnInit() {
    this.getAward().then(()=>{
      console.log(this.award);
      console.log(this.veterans)
    })
  }

  goBack(){
    this.location.back();
  }

}
