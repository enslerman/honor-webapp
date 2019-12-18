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

  lasts:any[]=[];
  Memos:any = [];
  news: any = [];

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

  public innerWidth: any;
  public innerHeight: any; 

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
  async getPosts(count){
    count = 8
    this.Memos = await this.API.getMemoForSlider(count)
    this.Memos = this.Memos.concat(this.Memos)
  }

  async getNews(count){
    count = 8
    this.news = await this.API.getNewsForSlider(count);
    this.news = this.news.concat(this.news)
  }
  async getLasts(){
    this.lasts=await this.API.getLasts();
  }


  ngOnInit() {
    this.adaptiveGrid();
    window.scroll(0,0);
    this.getPosts(8).then(()=> {
      console.table(this.Memos)
      
    });
    this.getNews(8).then(()=> {
      console.log(this.news)
    });
    this.getLasts().then(()=> {
      console.log(this.lasts)
      this.lasts.unshift({})
    });
  }
  
}
