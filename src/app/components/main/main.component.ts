import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/services/http.service';
import {useAnimation, transition,trigger,query,style,animate} from "@angular/animations";
import { slideInRightOnEnterAnimation, slideOutLeftOnLeaveAnimation,slideInRightAnimation } from 'angular-animations';

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

  constructor(private http: HttpClient, private API: HttpService) {

  }

  play1=false;
  itemsPerSlide = 4;
  singleSlideOffset = true;
  slides:any = [];
  visibleSlides:any=[];

  jopa:any = {
    "id": "",
    "title":"",
    "description":"",
    "image":"",
    hdn:false
  };

  
  play(){
    this.play1=!this.play1;
    setTimeout(()=> this.play1=false,1000)
   // this.play1=false;
    //this.play1=false;
  }
    

  async getPost(id){
    this.jopa = await this.API.getPostById(id);
  }

  async getPosts(){
    this.slides = await this.API.getMain();
  }

  ngOnInit() {
    
    let index=this.itemsPerSlide-1;
    this.getPost(1)
    this.getPosts().then(()=>{
      console.log(this.slides);
      for(let i=0;i<this.itemsPerSlide;i++){
        this.visibleSlides.push(this.slides[i]);
      }
      
      
    });
    
    
    let a=()=>{
      setTimeout(()=>this.play1=false,1000);
      console.log(this.visibleSlides);
      this.play1=true;
      //
      this.visibleSlides[this.visibleSlides.length-1].hdn=false;
      //this.visibleSlides[0].hdn=false;
      if(index<6)
        index++;
      else
        index=0;    
      this.visibleSlides.push(this.slides[index]);
     // this.visibleSlides.unshift(this.slides[index+1]);
      this.visibleSlides[this.visibleSlides.length-1].hdn=true;
      //this.visibleSlides[0].hdn=true;
       setTimeout(()=>{},1000)
      this.visibleSlides=this.visibleSlides.slice(1);
      setTimeout(a, 2000);
      
    }
    setTimeout(a,2000);
    
    
   
  }

}
