import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullRallyComponent } from './full-rally.component';

describe('FullRallyComponent', () => {
  let component: FullRallyComponent;
  let fixture: ComponentFixture<FullRallyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullRallyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullRallyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
