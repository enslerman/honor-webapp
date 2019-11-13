import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-memories',
  templateUrl: './memories.component.html',
  styleUrls: ['./memories.component.scss']
})
export class MemoriesComponent implements OnInit {

  constructor( 
    private http: HttpClient, 
    private API: HttpService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
  ) {
    this.activatedRouter.params.subscribe(param => {
      this.id = param.id;
    });
  }

  id: number;
  memo: any;

  async getPost(id){
    this.memo = await this.API.getPostById(id);
  }

  ngOnInit() {
    this.getPost(this.id).then(()=>{
      console.log(this.memo);
    })
  }

}
