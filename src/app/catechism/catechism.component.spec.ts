import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatechismComponent } from './catechism.component';

describe('CatechismComponent', () => {
  let component: CatechismComponent;
  let fixture: ComponentFixture<CatechismComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatechismComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatechismComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
