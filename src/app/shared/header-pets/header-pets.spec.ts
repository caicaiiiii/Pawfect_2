import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPets } from './header-pets';

describe('HeaderPets', () => {
  let component: HeaderPets;
  let fixture: ComponentFixture<HeaderPets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderPets],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderPets);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
