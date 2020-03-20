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

  constructor(private spinner: NgxSpinnerService, private themeService: ThemeService) { }

  opened: boolean = false; // true
  isDarkTheme: Observable<boolean>;

  scrHeight:any;
  scrWidth:any;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
  }

  ngOnInit() {
    this.getScreenSize()
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1)
    this.isDarkTheme = this.themeService.isDarkTheme;
  }

  onActivate(event) {
    window.scroll(0,0)
  }

}