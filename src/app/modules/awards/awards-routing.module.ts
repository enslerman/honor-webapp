import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AwardsComponent } from 'src/app/components/awards/awards.component';
import { FullAwardsComponent } from 'src/app/components/awards/full-awards/full-awards.component';


const routes: Routes = [
  {
    path: "",
    component: AwardsComponent
  },
  { path:":id", 
    component: FullAwardsComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AwardsRoutingModule { }
