import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateQuestionListComponent } from './update-question-list.component';

describe('UpdateQuestionListComponent', () => {
  let component: UpdateQuestionListComponent;
  let fixture: ComponentFixture<UpdateQuestionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateQuestionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateQuestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
