import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatagridreactiveformhomeComponent } from './datagridreactiveformhome.component';

describe('DatagridreactiveformhomeComponent', () => {
  let component: DatagridreactiveformhomeComponent;
  let fixture: ComponentFixture<DatagridreactiveformhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatagridreactiveformhomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatagridreactiveformhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
