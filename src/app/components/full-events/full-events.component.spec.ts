import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullEventsComponent } from './full-events.component';

describe('FullEventsComponent', () => {
  let component: FullEventsComponent;
  let fixture: ComponentFixture<FullEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
