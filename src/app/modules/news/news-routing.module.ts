import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsComponent } from 'src/app/components/news/news.component';
import { FullNewsComponent } from 'src/app/components/news/full-news/full-news.component';


const routes: Routes = [
  {
    path: "",
    component: NewsComponent
  },
  { path:":id", 
    component: FullNewsComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }