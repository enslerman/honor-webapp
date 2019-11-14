import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

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
  news: any;

  async getPost(id){
    this.news = await this.API.getPostById(id);
  }

  ngOnInit() {
    this.getPost(this.id).then(()=>{
      console.log(this.news);
    })
  }

}
