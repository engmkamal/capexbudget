import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestoronbehalfofhomeComponent } from './requestoronbehalfofhome.component';

describe('RequestoronbehalfofhomeComponent', () => {
  let component: RequestoronbehalfofhomeComponent;
  let fixture: ComponentFixture<RequestoronbehalfofhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestoronbehalfofhomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestoronbehalfofhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
