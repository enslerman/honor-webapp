import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/services/http.service';
import { slideInRightOnEnterAnimation, slideOutLeftOnLeaveAnimation,slideInRightAnimation } from 'angular-animations';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag'
import { Observable } from 'apollo-link';

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

  constructor(private http: HttpClient, private API: HttpService, private graph: Apollo) {}

  // lasts:any[] = []
  gridLasts:any;
  lasts:any = [];
  Memos:any = [];
  news: any = [];

  tiles: Tile[] = [
    {text: '1', cols: 2, rows: 1, color: '#212529'},
    {text: '2', cols: 1, rows: 1, color: '#212529'},
    {text: '3', cols: 1, rows: 1, color: '#212529'},
    {text: '4', cols: 1, rows: 1, color: '#212529'},
    {text: '5', cols: 1, rows: 1, color: '#212529'},
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
  
  async getPosts(){
    this.API.getAll('{getAll(page: 1, count: 8, type: 3) {id title title_image}}').subscribe(res => {
      this.Memos = res.data
      this.Memos = this.Memos.getAll
      this.Memos = this.Memos.concat(this.Memos)
    })
  }

  async getNews(){
    this.API.getAll('{getAll(page: 1, count: 8, type: 4) {id title title_image}}').subscribe(res => {
      this.news = res.data
      this.news = this.news.getAll
      this.news = this.news.concat(this.news)
    })
  }

  getLasts(){
    this.gridLasts = this.API.getLasts('{getGrid{image title type}}').subscribe(result => {
      this.lasts = result.data
      this.lasts = this.lasts.getGrid 
    });
  }


  ngOnInit() {
    this.adaptiveGrid();
    window.scroll(0,0);
    this.getPosts();
    this.getNews();
    this.getLasts()
  }
  
}
