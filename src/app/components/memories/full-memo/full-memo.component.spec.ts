import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullMemoComponent } from './full-memo.component';

describe('FullMemoComponent', () => {
  let component: FullMemoComponent;
  let fixture: ComponentFixture<FullMemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullMemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullMemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
