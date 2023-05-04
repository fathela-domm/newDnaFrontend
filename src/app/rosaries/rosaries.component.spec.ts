import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RosariesComponent } from './rosaries.component';

describe('RosariesComponent', () => {
  let component: RosariesComponent;
  let fixture: ComponentFixture<RosariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RosariesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RosariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
