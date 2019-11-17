import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rally',
  templateUrl: './rally.component.html',
  styleUrls: ['./rally.component.scss']
})
export class RallyComponent implements OnInit {

  constructor(  
    private API: HttpService,
    private activatedRouter: ActivatedRoute,
  ) {
    this.activatedRouter.params.subscribe(param => {
      this.id = param.id;
    });
  }

  id: number;
  memo: any;

  async getPosts(){
    this.memo = await this.API.getMain();
  }

  ngOnInit() {
    this.getPosts().then(()=>{
      console.log(this.memo);
    })
  }

}
