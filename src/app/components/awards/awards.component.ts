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
  awards: any;

  async getAwards(){
    let data:any = await this.API.getOrdens(0,10) 
    this.awards = data.content
    console.log(this.awards); 
  }

  ngOnInit() {
    this.getAwards();
  }

}
