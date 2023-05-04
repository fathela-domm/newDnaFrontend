import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatholicPrayersComponent } from './catholic-prayers.component';

describe('CatholicPrayersComponent', () => {
  let component: CatholicPrayersComponent;
  let fixture: ComponentFixture<CatholicPrayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatholicPrayersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatholicPrayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
