import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatholicNewsComponent } from './catholic-news.component';

describe('CatholicNewsComponent', () => {
  let component: CatholicNewsComponent;
  let fixture: ComponentFixture<CatholicNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatholicNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatholicNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
