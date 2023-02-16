import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExceluploadhomeComponent } from './exceluploadhome.component';

describe('ExceluploadhomeComponent', () => {
  let component: ExceluploadhomeComponent;
  let fixture: ComponentFixture<ExceluploadhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExceluploadhomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExceluploadhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
