import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogNames } from './dog-names';

describe('DogNames', () => {
  let component: DogNames;
  let fixture: ComponentFixture<DogNames>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DogNames],
    }).compileComponents();

    fixture = TestBed.createComponent(DogNames);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
