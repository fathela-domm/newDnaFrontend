import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyReadingsComponent } from './daily-readings.component';

describe('DailyReadingsComponent', () => {
  let component: DailyReadingsComponent;
  let fixture: ComponentFixture<DailyReadingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyReadingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyReadingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
