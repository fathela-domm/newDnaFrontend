import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldTestamentComponent } from './old-testament.component';

describe('OldTestamentComponent', () => {
  let component: OldTestamentComponent;
  let fixture: ComponentFixture<OldTestamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldTestamentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OldTestamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
