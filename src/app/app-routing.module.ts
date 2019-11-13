import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { MemoriesComponent } from './components/memories/memories.component';
import { NewsComponent } from './components/news/news.component';


const routes: Routes = [
  { path: "", component: MainComponent },
  { path:"memories/:id", component: MemoriesComponent },
  { path:"news/:id", component: NewsComponent },
  { path: "**", redirectTo: ""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
