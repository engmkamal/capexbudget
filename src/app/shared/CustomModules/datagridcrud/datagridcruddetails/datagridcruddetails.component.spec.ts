import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatagridcruddetailsComponent } from './datagridcruddetails.component';

describe('DatagridcruddetailsComponent', () => {
  let component: DatagridcruddetailsComponent;
  let fixture: ComponentFixture<DatagridcruddetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatagridcruddetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatagridcruddetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
