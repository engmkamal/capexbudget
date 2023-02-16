import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowshomeComponent } from './workflowshome.component';

describe('WorkflowshomeComponent', () => {
  let component: WorkflowshomeComponent;
  let fixture: ComponentFixture<WorkflowshomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowshomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowshomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
