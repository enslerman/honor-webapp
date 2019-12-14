import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/services/http.service';
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

  public innerWidth: any;
  lasts:any[]=[];
  slides:any = [];
  newSlides: any = [];

  news: any = [];
  public innerHeight: any; 
  tiles: Tile[] = [
    {text: 'One', cols: 2, rows: 1, color: 'blue'},
    {text: 'One', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 1, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 1, rows: 1, color: '#DDBDF1'},
  ];
  
  jopa:any = {
    "id": "",
    "title":"",
    "description":"",
    "image":"",
    hdn:false
  };

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.adaptiveGrid()
  } 


  adaptiveGrid(){
    this.innerHeight= window.innerHeight;
    this.innerWidth = window.innerWidth;   
    if(this.innerHeight>this.innerWidth){
      for(let tile of this.tiles)
        tile.cols=3;
    }
    else{
      for(let tile of this.tiles)
        tile.cols=1;
      this.tiles[0].cols=2
    }
  }

  async getPosts(){
    this.slides = await this.API.getMain();
  }

  async getNews(){
    this.news = await this.API.getNews();
  }
  async getLasts(){
    this.lasts=await this.API.getLasts();
  }


  ngOnInit() {
    this.adaptiveGrid();
    window.scroll(0,0);
    this.getPosts().then(()=> {
      for (let i = 0; i < 7; i++) {
        this.newSlides[i] = this.slides
      }
      console.table(this.newSlides)
    });
    this.getNews().then(()=> {
      console.log(this.news)
    });
    this.getLasts().then(()=> {
      console.log(this.lasts)
      this.lasts.unshift({})
    });
  }
  
  slideConfig = {
    "arrows": false,
    "autoplay": true,
    "autoplaySpeed": 2000,
    "responsive": [
      {
        "breakpoint": 2600,
        "settings": {
          "slidesToShow": 5,
          "slidesToScroll": 1,
          "infinite": true,
          "autoplay": true,
          "autoplaySpeed": 2000,
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
          "autoplaySpeed": 2000,
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
          "autoplaySpeed": 2000,
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
          "autoplaySpeed": 2000,
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
          "autoplaySpeed": 2000,
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
          "autoplaySpeed": 2000,
          "mobileFirst": true,
        }
      }
    ]
  }
}
