import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateQueComponent } from './update-que.component';

describe('UpdateQueComponent', () => {
  let component: UpdateQueComponent;
  let fixture: ComponentFixture<UpdateQueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateQueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateQueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
