import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-grid-slider',
  templateUrl: './grid-slider.component.html',
  styleUrls: ['./grid-slider.component.scss']
})
export class GridSliderComponent implements OnInit {

  constructor(private API: HttpService) { }
  photos:any=[];
  ngOnInit() {
    this.getLastPhotos();
  }

  async getLastPhotos(){
    this.photos=await this.API.getLastPhotos();
  }

}
