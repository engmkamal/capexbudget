import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestorparentComponent } from './requestorparent.component';

describe('RequestorparentComponent', () => {
  let component: RequestorparentComponent;
  let fixture: ComponentFixture<RequestorparentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestorparentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestorparentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
