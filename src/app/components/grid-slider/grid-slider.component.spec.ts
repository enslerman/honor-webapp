import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridSliderComponent } from './grid-slider.component';

describe('GridSliderComponent', () => {
  let component: GridSliderComponent;
  let fixture: ComponentFixture<GridSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
