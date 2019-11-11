import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  cards = [
    {
      title: 'Записки о прошедшем времени. Ломов С.В.',
      img: 'http://veteran-chest.ru/images/memory/Lomov.jpg'
    },
    {
      title: 'Записки о прошедшем времени. Ломов С.В.',
      img: 'http://veteran-chest.ru/images/memory/Lomov.jpg'
    },
    {
      title: 'Записки о прошедшем времени. Ломов С.В.',
      img: 'http://veteran-chest.ru/images/memory/Lomov.jpg'
    },
    {
      title: 'Записки о прошедшем времени. Ломов С.В.',
      img: 'http://veteran-chest.ru/images/memory/Lomov.jpg'
    }
  ];
  slides: any = [[]];
  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }
  ngOnInit() {
    this.slides = this.chunk(this.cards, 1);
  }

}
