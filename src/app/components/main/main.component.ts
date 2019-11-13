import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/services/http.service';
import { OwlOptions,SlidesOutputData } from 'ngx-owl-carousel-o';

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
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    autoplay:true,
    autoplaySpeed:2500,
    autoplayTimeout: 3000,
    rewind: true,
    autoplayHoverPause:false,
    navSpeed: 700,
    animateOut: 'linear',
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

  customOptionsReverse: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    autoplay:true,
    autoplaySpeed:2500,
    autoplayTimeout: 3000,
    rewind: true,
    rtl:true,
    autoplayHoverPause:false,
    navSpeed: 700,
    animateOut: 'linear',
    animateIn: 'linear',
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
