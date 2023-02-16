import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyportalhomeComponent } from './myportalhome.component';

describe('MyportalhomeComponent', () => {
  let component: MyportalhomeComponent;
  let fixture: ComponentFixture<MyportalhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyportalhomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyportalhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
