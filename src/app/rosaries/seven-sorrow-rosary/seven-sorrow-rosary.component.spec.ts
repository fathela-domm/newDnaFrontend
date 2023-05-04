import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SevenSorrowRosaryComponent } from './seven-sorrow-rosary.component';

describe('SevenSorrowRosaryComponent', () => {
  let component: SevenSorrowRosaryComponent;
  let fixture: ComponentFixture<SevenSorrowRosaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SevenSorrowRosaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SevenSorrowRosaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
