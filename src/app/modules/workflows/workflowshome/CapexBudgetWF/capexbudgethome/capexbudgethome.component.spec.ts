import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapexbudgethomeComponent } from './capexbudgethome.component';

describe('CapexbudgethomeComponent', () => {
  let component: CapexbudgethomeComponent;
  let fixture: ComponentFixture<CapexbudgethomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapexbudgethomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapexbudgethomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
