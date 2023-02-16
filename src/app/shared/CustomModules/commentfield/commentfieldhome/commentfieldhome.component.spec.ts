import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentfieldhomeComponent } from './commentfieldhome.component';

describe('CommentfieldhomeComponent', () => {
  let component: CommentfieldhomeComponent;
  let fixture: ComponentFixture<CommentfieldhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentfieldhomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentfieldhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
