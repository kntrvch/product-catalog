import { Component } from '@angular/core';
import { CountdownService } from '../../services/countdown.service';
import { Observable, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApolloService } from '../../services/apollo.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-view-page',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-view-page.component.html',
  styleUrl: './product-view-page.component.scss',
})
export class ProductViewPageComponent {
  product$!: Observable<Product>;
  countdown$!: Observable<string>;

  constructor(
    private apollo: ApolloService,
    private activatedRoute: ActivatedRoute,
    private countdownService: CountdownService
  ) {}

  ngOnInit(): void {
    this.product$ = this.activatedRoute.params.pipe(
      switchMap((params) => {
        const productId = params['id'];
        return this.apollo.getProduct(productId);
      })
    );

    this.countdown$ = this.countdownService.getCountdownToMidnight();
  }
}
