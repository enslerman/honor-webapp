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
  award: any;
  veterans: any;

  async getAward(){
    this.award = await this.API.getOrdenById(this.id);
    this.veterans = this.award.veterans;
    this.title_image = this.award.titleImage;
  }

  ngOnInit() {
    this.getAward()
  }

  goBack(){
    this.location.back();
  }

}
