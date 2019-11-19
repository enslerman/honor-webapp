import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalleryComponent } from 'src/app/components/gallery/gallery.component';
import { FullGalleryComponent } from 'src/app/components/full-gallery/full-gallery.component';


const routes: Routes = [
  {
    path: "",
    component: GalleryComponent
  },
  { path:":id", 
    component: FullGalleryComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule { }