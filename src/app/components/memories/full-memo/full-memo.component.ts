import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-full-memo',
  templateUrl: './full-memo.component.html',
  styleUrls: ['./full-memo.component.scss']
})
export class FullMemoComponent implements OnInit {

  constructor(  
    private API: HttpService, 
    private activatedRouter: ActivatedRoute,
    private location:Location,
    private sanitizer: DomSanitizer,
    private router: Router,
  ) { 
    this.activatedRouter.params.subscribe(param => {
      this.id = param.id;
    });
  }
  htmlData;

  id: number;
  memo:any = {};
  OtherMemo: any = [{}];

  getMemo(){
    this.API.getAll(`{getById(id: ${this.id}, type: 3) {id title title_image description time author}}`).subscribe(res => {
      this.memo = res.data;
      this.memo = this.memo.getById;
      this.htmlData=this.sanitizer.bypassSecurityTrustHtml(this.memo.description);
    })
  }

  getOtherMemo() {
    this.API.getAll('{getAll(page: 1, count: 8, type: 3) {id title title_image}}').subscribe(res => {
      this.OtherMemo = res.data
      this.OtherMemo = this.OtherMemo.getAll
    })
  }

  ngOnInit() {
    this.getMemo()
    this.getOtherMemo()
  }

  goBack(){
    this.location.back();
  }

  routerLink(id) {
    console.log(id)
    this.id = id;
    this.router.navigateByUrl(`/memories/${id}`);
    this.getMemo()
  }

}
