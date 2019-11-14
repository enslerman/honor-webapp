import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { MemoriesComponent } from './components/memories/memories.component';
import { NewsComponent } from './components/news/news.component';
import { FullNewsComponent } from './components/full-news/full-news.component';
import { FullMemoComponent } from './components/full-memo/full-memo.component';
import { AboutComponent } from './components/about/about.component';
import { FullRallyComponent } from './components/full-rally/full-rally.component';
import { FullEventsComponent } from './components/full-events/full-events.component';


const routes: Routes = [
  { path: "", component: MainComponent },
  { path:"memories/:id", component: MemoriesComponent },
  { path:"news/:id", component: NewsComponent },
  { path:"news", component: FullNewsComponent },
  { path:"memories", component: FullMemoComponent },
  { path:"about", component: AboutComponent },
  { path:"rally", component: FullRallyComponent },
  { path:"events", component: FullEventsComponent },
  { path: "**", redirectTo: ""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
