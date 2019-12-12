import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/services/http.service';
import { useAnimation, transition,trigger,query,style,animate } from "@angular/animations";
import { slideInRightOnEnterAnimation, slideOutLeftOnLeaveAnimation,slideInRightAnimation } from 'angular-animations';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    slideInRightAnimation({anchor:"play",duration: 1000, delay: 0, translate: '100%' }),
    slideOutLeftOnLeaveAnimation({anchor:"out",duration: 1000, delay: 0, translate: '100%' }),
    slideInRightOnEnterAnimation({anchor:"in",duration: 1000, delay: 0, translate: '100%' })
 ]
})
export class MainComponent implements OnInit {

  constructor(private http: HttpClient, private API: HttpService) {}

  slides:any = [
    {
      image:""
    }
  ];
  news: any = [];
  vh = window.innerHeight * 0.01;
  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
  jopa:any = {
    "id": "",
    "title":"",
    "description":"",
    "image":"",
    hdn:false
  };

  async getPosts(){
    this.slides = await this.API.getMain();
  }

  async getNews(){
    this.news = await this.API.getNews();
  }

  ngOnInit() {
    window.scroll(0,0);
    window.addEventListener('resize', () => {
      // We execute the same script as before
      document.documentElement.style.setProperty('--vh', `${this.vh}px`);
    });
    this.getPosts().then(()=> {
      console.log(this.slides)
    });
    this.getNews().then(()=> {
      console.log(this.news)
    });
  }
  

  slideConfig = {
    "arrows": false,
    "slidesToShow": 5,
    "slidesToScroll": 1,
    "autoplay": true,
    "autoplaySpeed": 4000,
    "responsive": [
      {
        "breakpoint": 2600,
        "settings": {
          "slidesToShow": 5,
          "slidesToScroll": 1,
          "infinite": true,
          "autoplay": true,
          "autoplaySpeed": 4000,
          "mobileFirst": true
        }
      },
      {
        "breakpoint": 1500,
        "settings": {
          "slidesToShow": 4,
          "slidesToScroll": 1,
          "infinite": true,
          "autoplay": true,
          "autoplaySpeed": 4000,
          "mobileFirst": true
        }
      },
      {
        "breakpoint": 1281,
        "settings": {
          "slidesToShow": 3,
          "slidesToScroll": 1,
          "infinite": true,
          "autoplay": true,
          "autoplaySpeed": 4000,
          "mobileFirst": true,
        }
      },
      {
        "breakpoint": 769,
        "settings": {
          "slidesToShow": 2,
          "slidesToScroll": 1,
          "infinite": true,
          "autoplay": true,
          "autoplaySpeed": 4000,
          "mobileFirst": true,
        }
      },
      {
        "breakpoint": 576,
        "settings": {
          "slidesToShow": 2,
          "slidesToScroll": 1,
          "infinite": true,
          "autoplay": true,
          "autoplaySpeed": 4000,
          "mobileFirst": true,
        }
      },
      {
        "breakpoint": 480,
        "settings": {
          "slidesToShow": 1,
          "slidesToScroll": 1,
          "infinite": true,
          "autoplay": true,
          "autoplaySpeed": 4000,
          "mobileFirst": true,
        }
      }
    ]
  }
}
