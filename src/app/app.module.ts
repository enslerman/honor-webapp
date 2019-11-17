import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import { MainComponent } from './components/main/main.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { NgxSpinnerModule } from "ngx-spinner";
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { MemoriesComponent } from './components/memories/memories.component';
import { NewsComponent } from './components/news/news.component';
import { FooterComponent } from './components/footer/footer.component';
import { FullNewsComponent } from './components/full-news/full-news.component';
import { FullMemoComponent } from './components/full-memo/full-memo.component';
import { FullRallyComponent } from './components/full-rally/full-rally.component';
import { FullEventsComponent } from './components/full-events/full-events.component';
import { AboutComponent } from './components/about/about.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FullGalleryComponent } from './components/full-gallery/full-gallery.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { RallyComponent } from './components/rally/rally.component';
import { EventsComponent } from './components/events/events.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AwardsComponent } from './components/awards/awards.component';

declare var Hammer: any;

export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any> {
    'pan': { direction: Hammer.DIRECTION_All },
    'swipe': { direction: Hammer.DIRECTION_VERTICAL },
  };

  buildHammer(element: HTMLElement) {
    const mc = new Hammer(element, {
      touchAction: 'auto',
          inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput,
          recognizers: [
            [Hammer.Swipe, {
              direction: Hammer.DIRECTION_HORIZONTAL
            }]
          ]
    });
    return mc;
  }
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MemoriesComponent,
    NewsComponent,
    FooterComponent,
    FullNewsComponent,
    FullMemoComponent,
    FullRallyComponent,
    FullEventsComponent,
    AboutComponent,
    FullGalleryComponent,
    GalleryComponent,
    RallyComponent,
    EventsComponent,
    NotfoundComponent,
    AwardsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatSliderModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MDBBootstrapModule.forRoot(),
    NgxSpinnerModule,
    SlickCarouselModule
  ],
  providers: [
    {
    provide: HAMMER_GESTURE_CONFIG,
    useClass: MyHammerConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
