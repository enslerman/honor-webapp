import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RallyComponent } from 'src/app/components/rally/rally.component';
import { FullRallyComponent } from 'src/app/components/rally/full-rally/full-rally.component';


const routes: Routes = [
  {
    path: "",
    component: RallyComponent
  },
  { path:":id", 
    component: FullRallyComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RallyRoutingModule { }
