import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalgridComponent } from './horizontalgrid.component';

describe('HorizontalgridComponent', () => {
  let component: HorizontalgridComponent;
  let fixture: ComponentFixture<HorizontalgridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorizontalgridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
