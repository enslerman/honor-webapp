import { Component, OnInit, HostListener, ViewChild, ElementRef, ContentChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/services/http.service';
import { slideInRightOnEnterAnimation, slideOutLeftOnLeaveAnimation,slideInRightAnimation } from 'angular-animations';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag'
import { Observable } from 'apollo-link';
import { DomSanitizer } from '@angular/platform-browser';

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
  @ViewChild('canvas1',{static:true}) canvas:any;
  getContext = require('get-canvas-context');
  
  constructor(private http: HttpClient, private API: HttpService, private graph: Apollo,private sanitizer:DomSanitizer) {}

  // lasts:any[] = []
  gridLasts:any;
  lasts:any = [];
  Memos:any = [];
  news: any = [];
  visibility: boolean = true;

  tiles: Tile[] = [
    {text: '1', cols: 2, rows: 1, color: '#212529'},
    {text: '2', cols: 1, rows: 1, color: '#212529'},
    {text: '3', cols: 1, rows: 1, color: '#212529'},
    {text: '4', cols: 1, rows: 1, color: '#212529'},
    {text: '5', cols: 1, rows: 1, color: '#212529'},
  ];


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
    let data:any = await this.API.getPostsByType(0,8,"MEMO")
    this.Memos = data.content;
    this.Memos = this.Memos.concat(this.Memos)
  }

  async getNews(){
    let data:any = await this.API.getPostsByType(0,8,"NEWS")
    this.news = data.content;
    this.news = this.news.concat(this.news)
  }

  async getLasts(){
    this.lasts = await this.API.getGrid()
  }
  
  ngOnInit() {
  //  console.log(this.canvas.nativeElement);
    this.visibility = true;
    this.adaptiveGrid();
    window.scroll(0,0);
    this.getPosts().then(()=> {
      this.getNews().then(()=> {
        this.getLasts().then().finally(()=> {
          this.visibility = false;
        });
      });
    })
  }

}
