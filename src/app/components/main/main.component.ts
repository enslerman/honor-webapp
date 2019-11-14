import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private http: HttpClient, private API: HttpService) {

  }


  itemsPerSlide = 5;
  singleSlideOffset = true;
  slides:any = [];
  visibleSlides:any=[];

  jopa:any = {
    "id": "",
    "title":"",
    "description":"",
    "image":""
  };

  
    
    

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
      for(let i=0;i<this.itemsPerSlide;i++){
        this.visibleSlides.push(this.slides[i]);
      }
    });
    
    let a=()=>{
      setTimeout(a, 1000);
      if(index<6)
        index++;
      else
        index=0;
      this.visibleSlides.push(this.slides[index]);
      setTimeout(()=>{},1000)
      this.visibleSlides=this.visibleSlides.slice(1);
      
      this.slides=this.slides.slice(1);
    }
    setTimeout(a,1000);
    
   
  }

}
