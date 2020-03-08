import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-rally',
  templateUrl: './rally.component.html',
  styleUrls: ['./rally.component.scss']
})
export class RallyComponent implements OnInit {

  constructor(  
    private API: HttpService,
    private activatedRouter: ActivatedRoute,
    private sanitizer: DomSanitizer,
  ) {
    this.activatedRouter.params.subscribe(param => {
      this.id = param.id;
    });
  }

  id: number;
  rally: any;

  async getPosts(){
    this.API.getAll('{getAll(page: 1, count: 8, type: 1) {id title title_image description}}').subscribe(res => {
      this.rally = res.data
      this.rally = this.rally.getAll
      for (let item of this.rally) {
        item.description = this.sanitizer.bypassSecurityTrustHtml(item.description.replace(new RegExp("<p[^>]*>","g"),"").replace(new RegExp("</p[^>]*>","g"),"").substring(0, 250) + `...`)
      }
    })
    console.log(this.rally)
  }

  ngOnInit() {
    this.getPosts()
  }

}
