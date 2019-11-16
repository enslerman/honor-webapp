import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RallyComponent } from './rally.component';

describe('RallyComponent', () => {
  let component: RallyComponent;
  let fixture: ComponentFixture<RallyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RallyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RallyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
