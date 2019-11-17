import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-full-awards',
  templateUrl: './full-awards.component.html',
  styleUrls: ['./full-awards.component.scss']
})
export class FullAwardsComponent implements OnInit {

  constructor(  
    private API: HttpService, 
    private activatedRouter: ActivatedRoute,
  ) { 
    this.activatedRouter.params.subscribe(param => {
      this.id = param.id;
    });
  }

  id: number;
  award:any = {
  };
  veterans: any;

  async getAward(){
    this.award = await this.API.getAwardById(this.id);
    this.veterans = this.award.veterans;
  }

  ngOnInit() {
    this.getAward().then(()=>{
      console.log(this.award);
      console.log(this.veterans)
    })
  }

}
