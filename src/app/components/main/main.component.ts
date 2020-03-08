import { Component, OnInit, HostListener, ViewChild, ElementRef, ContentChild } from '@angular/core';
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
  @ViewChild('canvas1',{static:true}) canvas:any;

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

  getLasts(){
    // this.lasts=await this.API.getLasts();
    this.gridLasts = this.API.getLasts('{getGrid{image title}}').subscribe(result => {
      this.lasts = result.data
      this.lasts = this.lasts.getGrid 
      console.log(this.lasts)
    });
  }

  cropImage(src,coords){
    console.log("suka");
    var img= new Image();
    img.src=src;
    img.crossOrigin="anonymous";
    // this.
   // var canvas = document.getElementById("canvas");
    
    var context = this.canvas.getContext("2d");
    var ratio=1.0;
    return img.onload=()=>{
        console.log(img.width);
        console.log(img.height);
        this.canvas.setAttribute("width",img.width);
        this.canvas.setAttribute("height",img.height);
        let sx=coords.sx,sy=coords.sy,sW=coords.sW,sH=coords.sH;
        context.drawImage(img,sx,sy,sW,sH,sx,sy,sW,sH);

        let dataURL=this.canvas.toDataURL();
        return dataURL;
    }
  }

  ngOnInit() {
    console.log(this.canvas.nativeElement);
    this.adaptiveGrid();
    window.scroll(0,0);
    this.getPosts(8).then(()=> {
      // console.table(this.Memos)
      
    });
    this.getNews(8).then(()=> {
      // console.log(this.news)
    });
    // this.getLasts().then(()=> {
    //   // console.log(this.lasts)
    //   //this.lasts.unshift({})
    // });
    this.getLasts()

  }
  
}
