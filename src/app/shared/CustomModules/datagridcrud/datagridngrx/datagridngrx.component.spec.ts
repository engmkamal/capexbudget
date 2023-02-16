import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatagridngrxComponent } from './datagridngrx.component';

describe('DatagridngrxComponent', () => {
  let component: DatagridngrxComponent;
  let fixture: ComponentFixture<DatagridngrxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatagridngrxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatagridngrxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
