import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangemanagementhomeComponent } from './changemanagementhome.component';

describe('ChangemanagementhomeComponent', () => {
  let component: ChangemanagementhomeComponent;
  let fixture: ComponentFixture<ChangemanagementhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangemanagementhomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangemanagementhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
