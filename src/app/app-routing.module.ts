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
import { FullGalleryComponent } from './components/full-gallery/full-gallery.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { RallyComponent } from './components/rally/rally.component';
import { EventsComponent } from './components/events/events.component';


const routes: Routes = [
  { path: "", component: MainComponent },
  { path:"memories", component: MemoriesComponent },
  { path:"news", component: NewsComponent },
  { path:"news/:id", component: FullNewsComponent },
  { path:"memories/:id", component: FullMemoComponent },
  { path:"gallery/:id", component: FullGalleryComponent },
  { path:"gallery", component: GalleryComponent },
  { path:"about", component: AboutComponent },
  { path:"rally/:id", component: FullRallyComponent },
  { path:"rally", component: RallyComponent },
  { path:"events", component: EventsComponent },
  { path:"events/:id", component: FullEventsComponent },
  { path: "**", redirectTo: ""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
