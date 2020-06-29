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
    this.API.getAll('{getAll(page: 1, count: 8, type: 3) {id title title_image title_image_mini}}').subscribe(res => {
      this.Memos = res.data
      this.Memos = this.Memos.getAll
      for(let i=0;i<this.Memos.length;i++){
        let last=this.Memos[i];
        if(last.title_image_mini!=="not set"){
          last.title_image=last.title_image_mini;
        }
      }
      this.Memos = this.Memos.concat(this.Memos)
    })
  }

  async getNews(){
    this.API.getAll('{getAll(page: 1, count: 8, type: 4) {id title title_image title_image_mini}}').subscribe(res => {
      this.news = res.data
      this.news = this.news.getAll
      for(let i=0;i<this.news.length;i++){
        let last=this.news[i];
        if(last.title_image_mini!=="not set"){
          last.title_image=last.title_image_mini;
        }
      }
      this.news = this.news.concat(this.news)
    })
  }

  dataUrl="";
  async getLasts(){
    // this.lasts=await this.API.getLasts();
    let proxyUrl="https://cors-anywhere.herokuapp.com/";
    this.gridLasts = this.API.getLasts('{getGrid{image title title_image_mini type url id}}').subscribe(async (result) => {
      this.lasts = result.data
      this.lasts = this.lasts.getGrid 
      for(let i=0;i<this.lasts.length;i++){
        let last=this.lasts[i];
        if(last.title_image_mini!=="not set"){
          last.image=last.title_image_mini;
        }
      }
      console.log(this.lasts)
    });
  }
  

  cropImage(src,coords){
    return new Promise((resolve,reject)=>{
      let context=this.getContext('2d',{
        width:0,
        height:0
      });
      console.log(src);
      var img= new Image();
      img.src=src;
      console.log(img)
      img.crossOrigin="anonymous";
    
      var ratio=1.0;
      img.onload=()=>{
        {
          console.log(img);
          console.log(img.height);
          let sx=coords.sx,sy=coords.sy,sW=coords.sW,sH=coords.sH;
          context.canvas.height=sH;
          context.canvas.width=sW;
          
          console.log(context);
          context.drawImage(img,sx,sy,sW,sH,0,0,sW,sH);
          let dataURL=context.canvas.toDataURL();
          resolve(dataURL);
        }
      };
    });
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
