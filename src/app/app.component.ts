import { Component, OnInit, DoCheck, HostListener } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService) { }

  opened: boolean = false; // true

  scrHeight:any;
  scrWidth:any;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
    // console.log(this.scrHeight, this.scrWidth);
  }

  ngOnInit() {
    this.getScreenSize()
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1)
    // if (this.scrWidth <= this.scrHeight) {
    //   this.opened = false;
    // } else {
    //   setTimeout(()=> {
    //     this.opened = false;
    //   }, 3000)
    // }
    
    // window.addEventListener('scroll', function() {
    //   console.log('scroll')
    // }, true);
  }

  onActivate(event) {
    window.scroll(0,0)
  }

}