import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemoriesComponent } from 'src/app/components/memories/memories.component';
import { FullMemoComponent } from 'src/app/components/memories/full-memo/full-memo.component';


const routes: Routes = [
  {
    path: "",
    component: MemoriesComponent
  },
  { path:":id", 
    component: FullMemoComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemoriesRoutingModule { }
