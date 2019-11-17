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
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AwardsComponent } from './components/awards/awards.component';
import { FullAwardsComponent } from './components/full-awards/full-awards.component';


const routes: Routes = [
  { path: "",            component: MainComponent },
  { path:"memories",     component: MemoriesComponent },
  { path:"memories/:id", component: FullMemoComponent },
  { path:"news",         component: NewsComponent },
  { path:"news/:id",     component: FullNewsComponent },
  { path:"gallery",      component: GalleryComponent },
  { path:"gallery/:id",  component: FullGalleryComponent },
  { path:"rally",        component: RallyComponent },
  { path:"rally/:id",    component: FullRallyComponent },
  { path:"events",       component: EventsComponent },
  { path:"events/:id",   component: FullEventsComponent },
  { path:"awards",       component: AwardsComponent },
  { path:"awards/:id",   component: FullAwardsComponent },
  { path:"about",        component: AboutComponent },
  { path:"**",           component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
