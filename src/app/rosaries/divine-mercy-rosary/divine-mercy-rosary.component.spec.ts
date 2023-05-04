import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivineMercyRosaryComponent } from './divine-mercy-rosary.component';

describe('DivineMercyRosaryComponent', () => {
  let component: DivineMercyRosaryComponent;
  let fixture: ComponentFixture<DivineMercyRosaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivineMercyRosaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DivineMercyRosaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
