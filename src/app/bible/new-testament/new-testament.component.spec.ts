import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTestamentComponent } from './new-testament.component';

describe('NewTestamentComponent', () => {
  let component: NewTestamentComponent;
  let fixture: ComponentFixture<NewTestamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTestamentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTestamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
