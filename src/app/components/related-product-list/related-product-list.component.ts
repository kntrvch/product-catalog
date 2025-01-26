import { Component, Input, OnChanges } from '@angular/core';
import { ApolloService } from '../../services/apollo.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Component({
  selector: 'app-related-product-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './related-product-list.component.html',
  styleUrl: './related-product-list.component.scss',
})
export class RelatedProductListComponent implements OnChanges {
  @Input() categoryId!: string;
  @Input() productId!: string;
  @Input() limit = 3;

  products$!: Observable<Product[]>;

  constructor(private apollo: ApolloService) {}

  ngOnChanges() {
    this.products$ = this.apollo.getRelatedProducts(
      this.categoryId,
      this.productId,
      this.limit
    );
  }
}
