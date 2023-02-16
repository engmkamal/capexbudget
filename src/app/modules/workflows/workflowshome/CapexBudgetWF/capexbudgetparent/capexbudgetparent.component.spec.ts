import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapexbudgetparentComponent } from './capexbudgetparent.component';

describe('CapexbudgetparentComponent', () => {
  let component: CapexbudgetparentComponent;
  let fixture: ComponentFixture<CapexbudgetparentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapexbudgetparentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapexbudgetparentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
