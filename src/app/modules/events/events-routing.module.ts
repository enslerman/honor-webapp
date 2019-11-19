import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from 'src/app/components/events/events.component';
import { FullEventsComponent } from 'src/app/components/full-events/full-events.component';


const routes: Routes = [
  {
    path: "",
    component: EventsComponent
  },
  { path:":id", 
    component: FullEventsComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
