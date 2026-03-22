import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogCare } from './dog-care';

describe('DogCare', () => {
  let component: DogCare;
  let fixture: ComponentFixture<DogCare>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DogCare],
    }).compileComponents();

    fixture = TestBed.createComponent(DogCare);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
