import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/services/http.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private http: HttpClient, private API: HttpService) {

  }

  cards:any = [];

  jopa:any = {
    "id": "",
    "title":"",
    "description":"",
    "image":""
  };

  async getPost(id){
    this.jopa = await this.API.getPostById(id);
  }

  async getPosts(){
    this.cards = await this.API.getMain();
  }

  ngOnInit() {
    
    this.getPost(1)
    this.getPosts().then(()=>{
      console.log(this.cards);     
    })
   
  }


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay:true,
    // autoplayTimeout:2000,
    smartSpeed:3000,
    rewind: true,
    autoplayHoverPause:false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
  }

}
