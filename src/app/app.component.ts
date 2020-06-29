import { Component, OnInit, DoCheck, HostListener } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ThemeService } from './services/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor() { }

  scrHeight: any;
  scrWidth: any;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
  }

  ngOnInit() {
    this.getScreenSize();
  }

  onActivate(event) {
    window.scroll(0, 0);
  }

}
