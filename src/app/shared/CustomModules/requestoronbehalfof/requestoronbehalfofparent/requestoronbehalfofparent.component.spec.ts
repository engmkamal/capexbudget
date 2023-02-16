import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestoronbehalfofparentComponent } from './requestoronbehalfofparent.component';

describe('RequestoronbehalfofparentComponent', () => {
  let component: RequestoronbehalfofparentComponent;
  let fixture: ComponentFixture<RequestoronbehalfofparentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestoronbehalfofparentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestoronbehalfofparentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
