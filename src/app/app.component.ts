import { Component, OnInit, DoCheck } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService) { }

  opened: boolean = true;

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1)
    window.addEventListener('scroll', function() {
      console.log('scroll')
    }, true);
  }



  onActivate(event) {
    window.scroll(0,0)
  }

}