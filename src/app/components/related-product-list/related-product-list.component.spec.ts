import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedProductListComponent } from './related-product-list.component';

describe('RelatedProductListComponent', () => {
  let component: RelatedProductListComponent;
  let fixture: ComponentFixture<RelatedProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatedProductListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatedProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
