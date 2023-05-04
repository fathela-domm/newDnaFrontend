import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheRosaryComponent } from './the-rosary.component';

describe('TheRosaryComponent', () => {
  let component: TheRosaryComponent;
  let fixture: ComponentFixture<TheRosaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheRosaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TheRosaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
