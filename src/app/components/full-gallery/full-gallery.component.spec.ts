import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullGalleryComponent } from './full-gallery.component';

describe('FullGalleryComponent', () => {
  let component: FullGalleryComponent;
  let fixture: ComponentFixture<FullGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
