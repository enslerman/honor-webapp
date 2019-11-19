import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { AboutComponent } from './components/about/about.component';
import { FullRallyComponent } from './components/full-rally/full-rally.component';
import { FullEventsComponent } from './components/full-events/full-events.component';
import { RallyComponent } from './components/rally/rally.component';
import { EventsComponent } from './components/events/events.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AwardsComponent } from './components/awards/awards.component';
import { FullAwardsComponent } from './components/full-awards/full-awards.component';
import { PreloadAllModules } from '@angular/router'


const routes: Routes = [
  { 
    path: "", 
    pathMatch: 'full',            
    component: MainComponent 
  },
  { 
    path:"memories",     
    loadChildren: () => import('./modules/memories/memories.module').then(m => m.MemoriesModule)
  },
  { 
    path:"news",     
    loadChildren: () => import('./modules/news/news.module').then(m => m.NewsModule)
  },
  { 
    path:"gallery",     
    loadChildren: () => import('./modules/gallery/gallery.module').then(m => m.GalleryModule)
  },
  { 
    path:"rally",     
    loadChildren: () => import('./modules/rally/rally.module').then(m => m.RallyModule)
  },
  { 
    path:"events",     
    loadChildren: () => import('./modules/events/events.module').then(m => m.EventsModule)
  },
  { 
    path:"awards",     
    loadChildren: () => import('./modules/awards/awards.module').then(m => m.AwardsModule)
  },
  { path:"about",        
    component: AboutComponent 
  },
  { path:"**",           
    component: NotfoundComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
