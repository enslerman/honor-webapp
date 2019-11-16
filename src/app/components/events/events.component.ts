import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  constructor(  
    private API: HttpService,
  ) { }

  id: number;
  news:any=[{id:"0"}];

  async getPosts(){
    this.news = await this.API.getNews()
  }

  ngOnInit() {
    this.getPosts().then(()=>{
      console.log(this.news);
    })
  }

}
