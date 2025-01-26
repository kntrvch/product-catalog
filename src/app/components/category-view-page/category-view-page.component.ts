import { Component } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { ApolloService } from '../../services/apollo.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-view-page',
  imports: [CommonModule, RouterModule],
  templateUrl: './category-view-page.component.html',
  styleUrl: './category-view-page.component.scss',
})
export class CategoryViewPageComponent {
  category$!: Observable<any>;

  constructor(
    private apollo: ApolloService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.category$ = this.activatedRoute.params.pipe(
      switchMap((params) => {
        const categoryId = params['id']; 
        return this.apollo.getCategory(categoryId);
      })
    );
  }
}
