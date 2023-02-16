import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalhistorygridComponent } from './approvalhistorygrid.component';

describe('ApprovalhistorygridComponent', () => {
  let component: ApprovalhistorygridComponent;
  let fixture: ComponentFixture<ApprovalhistorygridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovalhistorygridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalhistorygridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
