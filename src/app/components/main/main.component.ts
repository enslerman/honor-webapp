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

  constructor(private http: HttpClient, private API: HttpService) {}

  // play1 = false;
  // itemsPerSlide = 4;
  // singleSlideOffset = true;
  slides:any = [];
  // visibleSlides:any = [];

  jopa:any = {
    "id": "",
    "title":"",
    "description":"",
    "image":"",
    hdn:false
  };

  

  // play(){
  //   this.play1 =!this.play1;
  //   setTimeout(() => this.play1 = false, 1000)

  //   try {
    
  //   } catch (error) {
      
  //   }
  // }
    
  // async getPost(id){
  //   this.jopa = await this.API.getPostById(id);
  // }

  async getPosts(){
    this.slides = await this.API.getMain();
  }

  ngOnInit() {
    // let index=this.itemsPerSlide-1;
    // this.getPost(1)
    this.getPosts().then(()=> {
      // for ( let i=0; i<this.itemsPerSlide; i++ ) {
        // this.visibleSlides.push(this.slides[i]);
      // }
    });
    
    // let a = () => {
    //   setTimeout(() => this.play1 = false, 1000);
    //   this.play1 = true;
    //   this.visibleSlides[this.visibleSlides.length - 1].hdn = false;
    //   if ( index < 6 ) index++;
    //   else index=0;    
    //   this.visibleSlides.push(this.slides[index]);
    //   this.visibleSlides[this.visibleSlides.length-1].hdn = true;
    //   setTimeout(() => {}, 1000)
    //   this.visibleSlides=this.visibleSlides.slice(1);
    //   setTimeout(a, 2000);
    // }

    // setTimeout(a, 2000);
  }
  

  slideConfig = {
    "arrows": false,
    "slidesToShow": 5,
    "slidesToScroll": 1,
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

  // removeSlide() {
  //   this.slides.length = this.slides.length - 1;
  // }
  
  // slickInit(e) {
  //   console.log('slick initialized');
  // }
  
  // breakpoint(e) {
  //   console.log('breakpoint');
  // }
  
  // afterChange(e) {
  //   console.log('afterChange');
  // }
  
  // beforeChange(e) {
  //   console.log('beforeChange');
  // }
}
