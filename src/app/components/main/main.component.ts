import { Component, OnInit, HostListener } from '@angular/core';
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
  public innerWidth: any;
  lasts:any[]=[];
  slides:any = [
    {
      image:""
    }
  ];
  news: any = [];
  public innerHeight: any; 
  tiles: Tile[] = [
    {text: 'One', cols: 2, rows: 1, color: 'blue'},
    {text: 'One', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 1, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 1, rows: 1, color: '#DDBDF1'},
  ];
  photos:any=[];
  jopa:any = {
    "id": "",
    "title":"",
    "description":"",
    "image":"",
    hdn:false
  };
  // lasts: any[] = [
  //   {
  //     "image": "https://9net.ru/uploads/posts/2019-01/1546515622_ricardo.gif",
  //   },
  //   {
  //     "image": "https://steamuserimages-a.akamaihd.net/ugc/951841177148216940/4C0E46016EE7ABF8440FCA7B9B5AB60EF55AA969/?imw=512&imh=384&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
  //   },
  //   {
  //     "image": "https://steamuserimages-a.akamaihd.net/ugc/956346433295880717/87FE6FB71818889F98F79BDA6BFC22BF99EA4112/",
  //   },
  //   {
  //     "image": "https://66.media.tumblr.com/366ad4b76e87b2787aecdcd8842b3f34/tumblr_p4h0p25SAo1wyxz4yo1_500.gifv",
  //   },
  //   {
  //     "image": "https://steamuserimages-a.akamaihd.net/ugc/951841177148216940/4C0E46016EE7ABF8440FCA7B9B5AB60EF55AA969/?imw=512&imh=384&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
  //   }
  // ]

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
  async getLastPhotos(){
    this.photos=await this.API.getLastPhotos();
  }

  ngOnInit() {
    this.adaptiveGrid();
    window.scroll(0,0);
    // window.addEventListener('resize', () => {
    //   // We execute the same script as before
    //   document.documentElement.style.setProperty('--vh', `${this.vh}px`);
    // });
    this.getPosts().then(()=> {
      console.log(this.slides)
    });
    this.getNews().then(()=> {
      console.log(this.news)
    });
    this.getLasts().then(()=> {
      console.log(this.lasts)
      this.lasts.unshift({})
    });
    this.getLastPhotos().then(()=> {
      console.log(this.photos);
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
