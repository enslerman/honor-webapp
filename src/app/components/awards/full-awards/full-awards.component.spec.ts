import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullAwardsComponent } from './full-awards.component';

describe('FullAwardsComponent', () => {
  let component: FullAwardsComponent;
  let fixture: ComponentFixture<FullAwardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullAwardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullAwardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
