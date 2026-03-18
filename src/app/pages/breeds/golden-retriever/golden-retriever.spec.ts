import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldenRetriever } from './golden-retriever';

describe('GoldenRetriever', () => {
  let component: GoldenRetriever;
  let fixture: ComponentFixture<GoldenRetriever>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoldenRetriever],
    }).compileComponents();

    fixture = TestBed.createComponent(GoldenRetriever);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
