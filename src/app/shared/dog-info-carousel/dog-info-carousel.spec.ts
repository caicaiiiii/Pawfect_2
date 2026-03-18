import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogInfoCarousel } from './dog-info-carousel';

describe('DogInfoCarousel', () => {
  let component: DogInfoCarousel;
  let fixture: ComponentFixture<DogInfoCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DogInfoCarousel],
    }).compileComponents();

    fixture = TestBed.createComponent(DogInfoCarousel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
