import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleattachmentsuploadComponent } from './multipleattachmentsupload.component';

describe('MultipleattachmentsuploadComponent', () => {
  let component: MultipleattachmentsuploadComponent;
  let fixture: ComponentFixture<MultipleattachmentsuploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleattachmentsuploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleattachmentsuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
